const httpStatus = require('http-status');
const { Restaurant} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a restaurant
 * @param {Object} restaurantBody
 * @returns {Promise<Restaurant>}
 */
const createRestaurant = async (restaurantBody , user) => {
  restaurantBody.user = user.id;
  const restaurant = await Restaurant.create({ ...restaurantBody });
  return restaurant;
};

/**
 * Query for restaurants
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRestaurants = async (filter, options) => {
    return await Restaurant.paginate(filter, options , async (option) => {
        return await Restaurant.find(option.filter).populate('user', { email: 1 }).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const restaurants = await Restaurant.paginate(filter, options);
//   return restaurants;
};

/**
 * Get restaurant by id
 * @param {ObjectId} id
 * @returns {Promise<Restaurant>}
 */
const getRestaurantById = async (id) => {
  return await Restaurant.findById(id);
};

/**
 * Update restaurant by id
 * @param {ObjectId} restaurantId
 * @param {Object} updateBody
 * @returns {Promise<Restaurant>}
 */
const updateRestaurantById = async (restaurantId, updateBody) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  if (updateBody.email && (await Restaurant.isEmailTaken(updateBody.email, restaurantId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(restaurant, updateBody);
  await restaurant.save();
  return restaurant;
};

/**
 * Delete restaurant by id
 * @param {ObjectId} restaurantId
 * @returns {Promise<Restaurant>}
 */
const deleteRestaurantById = async (restaurantId) => {
  const restaurant = await getRestaurantById(restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  await restaurant.remove();
  return restaurant;
};

const getRestaurantByUser = async (userId) => {
  const restaurant = await Restaurant.findOne({
    user : userId
  })
  if(!restaurant){
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  return restaurant;
}
module.exports = {
  createRestaurant,
  queryRestaurants,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  getRestaurantByUser
};