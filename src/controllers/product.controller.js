const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, restaurantService } = require('../services');
require("dotenv").config();

const createProduct = catchAsync(async (req, res) => {
  let body = req.body;
  if(req.files.productImg && req.files.productImg[0]){
    body.imageUrl = req.files.productImg[0].path;
  }
  const resturant = await restaurantService.getRestaurantByUser(req.user.id);
  body.restaurant = resturant.id;
  const product = await productService.createProduct(body, req.user);
  res.send(product)
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status','restaurant']);
  const result = await productService.queryProducts(filter);
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
  let body = req.body;
  if(req.files?.productImg && req.files.productImg[0]){
    body.imageUrl = req.files.productImg[0].path;
  }
  const product = await productService.updateProductById(req.params.productId, body);
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


module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  // getProductsByUser,
};
