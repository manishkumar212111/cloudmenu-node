const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body, req.user);
  res.send(category)
});

const getCategorys = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status',"name", 'role', 'restaurant', "menu"]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await categoryService.queryCategorys(filter, options);
  res.send(result);
});

const getCategory = catchAsync(async (req, res) => {
  let category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategoryById(req.params.categoryId);
  res.send({ status : true });
});

const getCategoryByUser = catchAsync(async (req, res) => {
  
  res.send(await categoryService.getCategoryByUser(req.user.id));

})
module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryByUser
};
