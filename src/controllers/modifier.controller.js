const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { modifierService, restaurantService } = require('../services');
require("dotenv").config();

const createModifier = catchAsync(async (req, res) => {
    let body = req.body;
    const resturant = await restaurantService.getRestaurantByUser(req.user.id);
    body.restaurant = resturant._id;
    console.log(body , resturant)
    const modifier = await modifierService.createModifier(body, req.user);
  res.send(modifier)
});

const getModifiers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'name', 'restaurant', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  options.page = options.page ? options.page : 1;
  const result = await modifierService.queryModifiers(filter, options);
  res.send(result);
});

const getModifier = catchAsync(async (req, res) => {
  let modifier = await modifierService.getModifierById(req.params.modifierId);
  if (!modifier) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Modifier not found');
  }
  res.send(modifier);
});

const updateModifier = catchAsync(async (req, res) => {
  const modifier = await modifierService.updateModifierById(req.params.modifierId, req.body);
  res.send(modifier);
});

const deleteModifier = catchAsync(async (req, res) => {
  await modifierService.deleteModifierById(req.params.modifierId);
  res.send({ status : true });
});

const getModifierByUser = catchAsync(async (req, res) => {
  
  res.send(await modifierService.getModifierByUser(req.user.id));

})
module.exports = {
  createModifier,
  getModifiers,
  getModifier,
  updateModifier,
  deleteModifier,
  getModifierByUser
};
