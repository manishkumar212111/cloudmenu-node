const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { menuService, restaurantService } = require('../services');
require("dotenv").config();

const createMenu = catchAsync(async (req, res) => {
  let body = req.body;
  if(req.files.coverImage && req.files.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }
  const resturant = await restaurantService.getRestaurantByUser(req.user.id);
  body.restaurant = resturant.id;
  const menu = await menuService.createMenu(body, req.user);
  res.send(menu)
});

const getMenus = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status','restaurant', 'category', "menu"]);
  const options = pick(req.query, ['limit']);
  options.limit = options.limit? options.limit: 12;
  const result = await menuService.queryMenus(filter, options);
  res.send(result);
});

const getMenu = catchAsync(async (req, res) => {
  let menu = await menuService.getMenuById(req.params.menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Menu not found');
  }
  res.send(menu);
});

const updateMenu = catchAsync(async (req, res) => {
  let body = req.body;
  if(req.files?.coverImage && req.files.coverImage[0]){
    body.coverImage = req.files.coverImage[0].path;
  }
  const menu = await menuService.updateMenuById(req.params.menuId, body);
  res.send(menu);
});

const deleteMenu = catchAsync(async (req, res) => {
  await menuService.deleteMenuById(req.params.menuId);
  res.send({ status : true });
});



module.exports = {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
