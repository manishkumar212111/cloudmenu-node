const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { qrService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createQr = catchAsync(async (req, res) => {
  const qr = await qrService.createQr(req.body, req.user);
  res.send(qr)
});

const getQrs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role','restaurant']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await qrService.queryQrs(filter, options);
  res.send(result);
});

const getQr = catchAsync(async (req, res) => {
  let qr = await qrService.getQrById(req.params.qrId);
  if (!qr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Qr not found');
  }
  res.send(qr);
});

const updateQr = catchAsync(async (req, res) => {
  const qr = await qrService.updateQrById(req.params.qrId, req.body);
  res.send(qr);
});

const deleteQr = catchAsync(async (req, res) => {
  await qrService.deleteQrById(req.params.qrId);
  res.send({ status : true });
});

const getQrByUser = catchAsync(async (req, res) => {
  
  res.send(await qrService.getQrByUser(req.user.id));

})
module.exports = {
  createQr,
  getQrs,
  getQr,
  updateQr,
  deleteQr,
  getQrByUser
};
