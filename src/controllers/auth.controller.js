const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, resp) => {
  const user = await userService.createUser(req.body);
  try {
    const tokens = await tokenService.generateAuthTokens(user);
    return resp.send({ user, tokens });
  }
   catch(err){
    console.log(err);
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let role= req.body.role ? req.body.role : "user";
  let user;

  if(req.body.mobile){
    user = await authService.loginUserWithMobileAndPassword(req.body.mobile, password, role, req.body.ccode);

  } else {
    user = await authService.loginUserWithEmailAndPassword(email, password, role);

  }
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
  res.send({status : true});
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
