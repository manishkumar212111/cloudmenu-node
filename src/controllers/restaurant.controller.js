const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService, userService } = require('../services');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const createRestaurant = catchAsync(async (req, res) => {
  let body = req.body;
  if(req.files.businessDoc && req.files.businessDoc[0]){
    body.businessDoc = req.files.businessDoc[0].path;
  }
  if(req.files.coverImage && req.files.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }

  const user = await User.findById(req.user);
  // compare password
  if (!user || !(await user.isPasswordMatch(req.body.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  delete body.password;

  const restaurant = await restaurantService.createRestaurant(body, req.user);
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
  let body = req.body;
  if(req.files.businessDoc && req.files.businessDoc[0]){
    body.businessDoc = req.files.businessDoc[0].path;
  }
  if(req.files.coverImage && req.files.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }

  const restaurant = await restaurantService.updateRestaurantById(req.params.restaurantId, body);
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
