const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService , stripeService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, resp) => {
  const user = await userService.createUser(req.body);
  let stripedata = {
    "accountId": user.id,
    "firstName": req.body.userName,
    "lastName": ".",
    "emailAddress": req.body.email
  }
  try {
  stripeService.createAccount(stripedata , async (response) => {
    let res = response.data;
    if(res && res.status){
        await userService.updateUserById(user.id , {
          stripeAccountId : res.content.stripeAccountId,
          stripeOnboardingLink : res.content.stripeOnboardingLink,
          autoLoginLink : res.content.autoLoginLink,
        });       
    } else {
      await userService.deleteUserById(user.id);
      return resp.send({data : res});
      
      //throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong with stripe');
    }
    const tokens = await tokenService.generateAuthTokens(user);
    return resp.send({ user, tokens });
  })
  } catch(err){
    console.log(err);
  }
});

const login = catchAsync(async (req, res) => {
  const { userName, password } = req.body;
  let role= req.body.role ? req.body.role : "user";
  const user = await authService.loginUserWithUserNameAndPassword(userName, password, role);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  // const resetPasswordUrl = `http://localhost:3000/reset-password?token=${resetPasswordToken}`;
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});


const googleLogin = catchAsync(async (req, res) => {
  let user = await authService.googleLogin(req.body.token);
  res.send(user);
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  googleLogin
};
