const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { cmsService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createCms = catchAsync(async (req, res) => {
  const cms = await cmsService.createCms(req.body, req.user);
  res.send(cms)
});

const getCmss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role', 'restaurant']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await cmsService.queryCmss(filter, options);
  res.send(result);
});

const getCms = catchAsync(async (req, res) => {
  let cms = await cmsService.getCmsById(req.params.cmsId);
  if (!cms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cms not found');
  }
  res.send(cms);
});

const updateCms = catchAsync(async (req, res) => {
  const cms = await cmsService.updateCmsById(req.params.cmsId, req.body);
  res.send(cms);
});

const deleteCms = catchAsync(async (req, res) => {
  await cmsService.deleteCmsById(req.params.cmsId);
  res.send({ status : true });
});

const getCmsByUser = catchAsync(async (req, res) => {
  
  res.send(await cmsService.getCmsByUser(req.user.id));

})
module.exports = {
  createCms,
  getCmss,
  getCms,
  updateCms,
  deleteCms,
  getCmsByUser
};
