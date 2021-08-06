const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
// const { e_templateService, blogService } = require("../services");
// const { getEmailTemplateByType } = require('./e_template.service');
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

// {
//   type : "",
//   data : {},
//   email : ""
// }
/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendSmailUsingTemplate = async (data) => {
  try{
    // console.log(e_templateService , blogService , getEmailTemplateByType);
    // let emTemplate = await getEmailTemplateByType(data.type);
    
    // emTemplate = emTemplate[0];
    // const subject = emTemplate.subject;
    // emTemplate.dynamic_var.forEach(elem => {
    //   emTemplate.content = emTemplate.content.split("{{"+elem+"}}").join(data.data[elem]);
    // })
    
    // emTemplate.content = emTemplate.content.split("&lt;").join("<")
    
    // const msg = { from: config.email.from, to : data.email, subject : emTemplate.subject, html : emTemplate.content };
    // await transport.sendMail(msg);
  } catch (err){
    console.log(err);
  }
  
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: config.email.from, to, subject, text };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:3000/#/reset-password/${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
};

const sendOTP = async (to, otp) => {
  const subject = 'Verify Your Account';
  const text = `Dear user,
  To verify your password, enter this code into your app : ${otp}
  If you did not register to GumTree, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendOTP,
  sendSmailUsingTemplate,
};
