const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require("../config/config");
const { Restaurant, User } = require('../models');
/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password, role="user") => {
  const user = await userService.checkLoginByEmail(email, role);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User doesn't exist.");
  } else {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const restaurant =await Restaurant.findOne({user: user.id}).select('status');
    // user.restaurant = restaurant;
    console.log(restaurant)

    return {user : user, restaurant : restaurant};
  }
};

/**
 * Login with username and password
 * @param {string} mobile
 * @param {string} password
 * @returns {Promise<User>}
 */
 const loginUserWithMobileAndPassword = async (mobile, password, role="user", ccode) => {
  const user = await userService.checkLoginByMobile(mobile, role, ccode);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User doesn't exist.");
  } else {
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    if(!user.status){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Your account is under verification, please contact admin');
    }

    const restaurant =await Restaurant.findOne({user: user.id}).select('status settings logo_url');
    // user.restaurant = restaurant;
    console.log(restaurant)

    return {user: user, restaurant : restaurant};
  }
};


/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    await userService.updateUserById(user.id, { password: newPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Google login
 * @param {string} token
 */
 const googleLogin = async ( token ) => {
  try {

    const { OAuth2Client } = require('google-auth-library')
    const client = ''

    const ticket = await client.verifyIdToken({
        idToken: token,
        // audience: config.GOOGLE_LOGIN_CLIENT_ID
    });
    console.log(ticket.getPayload());
    const { name, email, picture , given_name , family_name , } = ticket.getPayload();
    if(email){
        let newUser = await userService.getUserByEmail(email);
        if(!newUser){
          let userBody = {
            first_name : given_name,
            last_name : family_name,
            email : email
          }
          let user = await userService.createUser(userBody);
          const tokens = await tokenService.generateAuthTokens(user);
          return { user, tokens };
        } else {
          const tokens = await tokenService.generateAuthTokens(newUser);
          await userService.updateUserById(newUser.id , { last_action : new Date().toISOString()});
          return { user : newUser , tokens : tokens };         
        }
    }
} catch (error) {
    console.log(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Something went wrong');
  }
};

const verifyOtp = async (otp, userId) => {
  try {
    const user = await User.findOne({_id: userId, otp: otp});
    if (!user) {
      throw new Error("Incorrect otp, please try again");
    }
    return user;
  } catch (error) {
    console.log(error)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect Otp');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  googleLogin,
  loginUserWithMobileAndPassword,
  verifyOtp
};
