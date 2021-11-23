const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { restaurantService, userService } = require('../services');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const { User, Restaurant } = require('../models');

const createRestaurant = catchAsync(async (req, res) => {
  let body = req.body;
  if(req?.files?.businessDoc && req?.files?.businessDoc[0]){
    body.businessDoc = req.files.businessDoc[0].path;
  }
  if(req?.files?.coverImage && req.files?.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }

  if(req?.files?.logoImg && req?.files?.logoImg[0]){
    body.logo_url = req.files.logoImg[0].path;
  }
  if(req?.files?.bannerImg && req.files?.bannerImg[0]){
    body.banner_url = req.files.bannerImg[0].path;
  }
  if(req.body?.bankDetail){
    console.log(req.body.bankDetail)
    // body.bankDetail = JSON.parse(req.body.bankDetail)
  }
  
  const restaurant = await restaurantService.createRestaurant(body, req.user);
  res.send(restaurant)
});

const getRestaurants = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role','user', 'category']);
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
  if(req?.files?.businessDoc && req?.files?.businessDoc[0]){
    body.businessDoc = req.files.businessDoc[0].path;
  }
  if(req?.files?.coverImage && req.files?.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }

  if(req?.files?.logoImg && req?.files?.logoImg[0]){
    body.logo_url = req.files.logoImg[0].path;
  }
  if(req?.files?.bannerImg && req.files?.bannerImg[0]){
    body.banner_url = req.files.bannerImg[0].path;
  }
  if(req.body?.bankDetail){
    console.log(req.body.bankDetail)
    // body.bankDetail = JSON.parse(req.body.bankDetail)
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

const subScriptionRequest = catchAsync(async (req, res) => {
  res.send(await restaurantService.subScriptionRequest(req.user.id));
})

const restaurantByKey = catchAsync(async (req, res) => {
  let restaurant = await Restaurant.findOne({url_key : req.query.url_key});
  if (!restaurant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
  }
  res.send(restaurant);
})

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByUser,
  subScriptionRequest,
  restaurantByKey
};
