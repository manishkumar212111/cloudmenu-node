const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.createRestaurant(req.body, req.user);
  res.send(restaurant)
});

const getRestaurants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role','user', 'user_type', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await restaurantService.queryRestaurants(filter, options);
  res.send(result);
});

const getRestaurant = catchAsync(async (req, res) => {
  let restaurant = await restaurantService.getRestaurantById(req.params.restaurantId);
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  res.send(restaurant);
});

const updateRestaurant = catchAsync(async (req, res) => {
  const restaurant = await restaurantService.updateRestaurantById(req.params.restaurantId, req.body);
  res.send(restaurant);
});

const deleteRestaurant = catchAsync(async (req, res) => {
  await restaurantService.deleteRestaurantById(req.params.restaurantId);
  res.send({ status : true });
});

const getRestaurantByUser = catchAsync(async (req, res) => {
  
  res.send(await restaurantService.getRestaurantByUser(req.user.id));

})
module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByUser
};
