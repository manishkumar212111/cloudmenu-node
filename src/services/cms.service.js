const httpStatus = require('http-status');
const { Cms} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a cms
 * @param {Object} cmsBody
 * @returns {Promise<Cms>}
 */
const createCms = async (cmsBody , user) => {
  cmsBody.user = user.id;
  const cms = await Cms.create({ ...cmsBody });
  return cms;
};

/**
 * Query for cmss
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCmss = async (filter, options) => {
    return await Cms.paginate(filter, options , async (option) => {
        return await Cms.find(option.filter).populate('user', { email: 1 }).
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
      });
//   const cmss = await Cms.paginate(filter, options);
//   return cmss;
};

/**
 * Get cms by id
 * @param {ObjectId} id
 * @returns {Promise<Cms>}
 */
const getCmsById = async (id) => {
  return await Cms.findById(id);
};

/**
 * Update cms by id
 * @param {ObjectId} cmsId
 * @param {Object} updateBody
 * @returns {Promise<Cms>}
 */
const updateCmsById = async (cmsId, updateBody) => {
  const cms = await getCmsById(cmsId);
  if (!cms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cms not found');
  }
  if (updateBody.email && (await Cms.isEmailTaken(updateBody.email, cmsId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(cms, updateBody);
  await cms.save();
  return cms;
};

/**
 * Delete cms by id
 * @param {ObjectId} cmsId
 * @returns {Promise<Cms>}
 */
const deleteCmsById = async (cmsId) => {
  const cms = await getCmsById(cmsId);
  if (!cms) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Cms not found');
  }
  await cms.remove();
  return cms;
};

const getCmsByUser = async (userId) => {
  const cms = await Cms.findOne({
    user : userId
  })
  if(!cms){
    throw new ApiError(httpStatus.NOT_FOUND, 'Cms not found');
  }
  return cms;
}
module.exports = {
  createCms,
  queryCmss,
  getCmsById,
  updateCmsById,
  deleteCmsById,
  getCmsByUser
};
