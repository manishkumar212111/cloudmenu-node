const httpStatus = require('http-status');
const { Modifier} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a modifier
 * @param {Object} modifierBody
 * @returns {Promise<Modifier>}
 */
const createModifier = async (modifierBody , user) => {
//   modifierBody.user = user.id;
  const modifier = await Modifier.create({ ...modifierBody });
  return modifier;
};

/**
 * Query for modifiers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryModifiers = async (filter, options) => {
    if(filter.name && filter.name !== ""){
      filter.name = {'$regex': filter.name}
    }
    return await Modifier.paginate(filter, options , async (option) => {
        return await Modifier.find(option.filter).populate('user', { email: 1 }).
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
      });
//   const modifiers = await Modifier.paginate(filter, options);
//   return modifiers;
};

/**
 * Get modifier by id
 * @param {ObjectId} id
 * @returns {Promise<Modifier>}
 */
const getModifierById = async (id) => {
  return await Modifier.findById(id);
};

/**
 * Update modifier by id
 * @param {ObjectId} modifierId
 * @param {Object} updateBody
 * @returns {Promise<Modifier>}
 */
const updateModifierById = async (modifierId, updateBody) => {
  const modifier = await getModifierById(modifierId);
  if (!modifier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Modifier not found');
  }
  if (updateBody.email && (await Modifier.isEmailTaken(updateBody.email, modifierId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(modifier, updateBody);
  await modifier.save();
  return modifier;
};

/**
 * Delete modifier by id
 * @param {ObjectId} modifierId
 * @returns {Promise<Modifier>}
 */
const deleteModifierById = async (modifierId) => {
  const modifier = await getModifierById(modifierId);
  if (!modifier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Modifier not found');
  }
  await modifier.remove();
  return modifier;
};

const getModifierByUser = async (userId) => {
  const modifier = await Modifier.findOne({
    user : userId
  })
  if(!modifier){
    throw new ApiError(httpStatus.NOT_FOUND, 'Modifier not found');
  }
  return modifier;
}
module.exports = {
  createModifier,
  queryModifiers,
  getModifierById,
  updateModifierById,
  deleteModifierById,
  getModifierByUser
};
