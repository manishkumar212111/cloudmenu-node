const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
require("dotenv").config();

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.body, req.user);
  res.send(order)
});

const getOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role', 'restaurant', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.limit = options.limit ? options.limit : 500;
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  let order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.send({ status : true });
});

const getOrderByUser = catchAsync(async (req, res) => {
  
  res.send(await orderService.getOrderByUser(req.user.id));

})
module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderByUser
};
