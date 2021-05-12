const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const config = require("../config/config");
/**
 * Login with username and password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithUserNameAndPassword = async (userName, password, role="user") => {
  const user = await userService.checkLoginByUserName(userName, role);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User doesn't exist.");
  } else {
    const user = await userService.getUserByUserName(userName);
    if (!user || !(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect userName or password');
    }
    return user;
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
    const client = new OAuth2Client(config.GOOGLE_LOGIN_CLIENT_ID)

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_LOGIN_CLIENT_ID
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

module.exports = {
  loginUserWithUserNameAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  googleLogin
};
