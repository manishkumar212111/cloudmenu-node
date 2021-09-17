const httpStatus = require('http-status');
const { Qr} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a qr
 * @param {Object} qrBody
 * @returns {Promise<Qr>}
 */
const createQr = async (qrBody , user) => {
  qrBody.user = user.id;
  const qr = await Qr.create({ ...qrBody });
  return qr;
};

/**
 * Query for qrs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQrs = async (filter, options) => {
    return await Qr.paginate(filter, options , async (option) => {
        return await Qr.find(option.filter).populate('user', { email: 1 }).
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
      });
//   const qrs = await Qr.paginate(filter, options);
//   return qrs;
};

/**
 * Get qr by id
 * @param {ObjectId} id
 * @returns {Promise<Qr>}
 */
const getQrById = async (id) => {
  return await Qr.findById(id);
};

/**
 * Update qr by id
 * @param {ObjectId} qrId
 * @param {Object} updateBody
 * @returns {Promise<Qr>}
 */
const updateQrById = async (qrId, updateBody) => {
  const qr = await getQrById(qrId);
  if (!qr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Qr not found');
  }
  if (updateBody.email && (await Qr.isEmailTaken(updateBody.email, qrId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(qr, updateBody);
  await qr.save();
  return qr;
};

/**
 * Delete qr by id
 * @param {ObjectId} qrId
 * @returns {Promise<Qr>}
 */
const deleteQrById = async (qrId) => {
  const qr = await getQrById(qrId);
  if (!qr) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Qr not found');
  }
  await qr.remove();
  return qr;
};

const getQrByUser = async (userId) => {
  const qr = await Qr.findOne({
    user : userId
  })
  if(!qr){
    throw new ApiError(httpStatus.NOT_FOUND, 'Qr not found');
  }
  return qr;
}
module.exports = {
  createQr,
  queryQrs,
  getQrById,
  updateQrById,
  deleteQrById,
  getQrByUser
};
