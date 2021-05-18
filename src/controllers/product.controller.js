const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user);
  res.send(product);
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role','user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.send({ status : true });
});

const getProductsByUser = catchAsync(async (req, res) => {
  res.send(await productService.getProductsByUser(req.query.userId ? req.query.userId : req.user.id));
  // let basic_info = await productService.getuserInfo(req.user.id);
  // res.send({
  //   resume_detail : resumes,
  //   basic_info : basic_info
  // });
});

const addUserInfo = catchAsync(async (req, res) => {
  let resumes = await productService.addUserInfo(req.body , req.params.userId ? req.params.userId : req.user.id);
  res.send(resumes);

});

const getProductsByUserName = catchAsync(async (req, res) => {
  res.send(await productService.getProductsByUserName(req.params.userName));
  
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
  addUserInfo,
  getProductsByUserName
};
