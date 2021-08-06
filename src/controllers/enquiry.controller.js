const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { enquiryService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createEnquiry = catchAsync(async (req, res) => {
  const enquiry = await enquiryService.createEnquiry(req.body, req.user);
  res.send(enquiry)
});

const getEnquirys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role', 'restaurant']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await enquiryService.queryEnquirys(filter, options);
  res.send(result);
});

const getEnquiry = catchAsync(async (req, res) => {
  let enquiry = await enquiryService.getEnquiryById(req.params.enquiryId);
  if (!enquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Enquiry not found');
  }
  res.send(enquiry);
});

const updateEnquiry = catchAsync(async (req, res) => {
  const enquiry = await enquiryService.updateEnquiryById(req.params.enquiryId, req.body);
  res.send(enquiry);
});

const deleteEnquiry = catchAsync(async (req, res) => {
  await enquiryService.deleteEnquiryById(req.params.enquiryId);
  res.send({ status : true });
});

const getEnquiryByUser = catchAsync(async (req, res) => {
  
  res.send(await enquiryService.getEnquiryByUser(req.user.id));

})
module.exports = {
  createEnquiry,
  getEnquirys,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getEnquiryByUser
};
