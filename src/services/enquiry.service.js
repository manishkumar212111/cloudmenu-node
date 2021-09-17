const httpStatus = require('http-status');
const { Enquiry} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a enquiry
 * @param {Object} enquiryBody
 * @returns {Promise<Enquiry>}
 */
const createEnquiry = async (enquiryBody , user) => {
  const enquiry = await Enquiry.create({ ...enquiryBody });
  return enquiry;
};

/**
 * Query for enquirys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEnquirys = async (filter, options) => {
    return await Enquiry.paginate(filter, options , async (option) => {
        return await Enquiry.find(option.filter).populate('user', { email: 1 }).
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
      });
//   const enquirys = await Enquiry.paginate(filter, options);
//   return enquirys;
};

/**
 * Get enquiry by id
 * @param {ObjectId} id
 * @returns {Promise<Enquiry>}
 */
const getEnquiryById = async (id) => {
  return await Enquiry.findById(id);
};

/**
 * Update enquiry by id
 * @param {ObjectId} enquiryId
 * @param {Object} updateBody
 * @returns {Promise<Enquiry>}
 */
const updateEnquiryById = async (enquiryId, updateBody) => {
  const enquiry = await getEnquiryById(enquiryId);
  if (!enquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Enquiry not found');
  }
  if (updateBody.email && (await Enquiry.isEmailTaken(updateBody.email, enquiryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(enquiry, updateBody);
  await enquiry.save();
  return enquiry;
};

/**
 * Delete enquiry by id
 * @param {ObjectId} enquiryId
 * @returns {Promise<Enquiry>}
 */
const deleteEnquiryById = async (enquiryId) => {
  const enquiry = await getEnquiryById(enquiryId);
  if (!enquiry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Enquiry not found');
  }
  await enquiry.remove();
  return enquiry;
};

const getEnquiryByUser = async (userId) => {
  const enquiry = await Enquiry.findOne({
    user : userId
  })
  if(!enquiry){
    throw new ApiError(httpStatus.NOT_FOUND, 'Enquiry not found');
  }
  return enquiry;
}
module.exports = {
  createEnquiry,
  queryEnquirys,
  getEnquiryById,
  updateEnquiryById,
  deleteEnquiryById,
  getEnquiryByUser
};
