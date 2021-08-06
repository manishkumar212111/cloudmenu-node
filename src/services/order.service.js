const httpStatus = require('http-status');
const { Order} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody , user) => {
//   orderBody.user = user.id;
  const order = await Order.create({ ...orderBody });
  return order;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
    return await Order.paginate(filter, options , async (option) => {
        return await Order.find(option.filter).populate('user', { email: 1 }).
        sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
      });
//   const orders = await Order.paginate(filter, options);
//   return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<Order>}
 */
const getOrderById = async (id) => {
  return await Order.findById(id);
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (orderId, updateBody) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  if (updateBody.email && (await Order.isEmailTaken(updateBody.email, orderId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await order.remove();
  return order;
};

const getOrderByUser = async (userId) => {
  const order = await Order.findOne({
    user : userId
  })
  if(!order){
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
}
module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderByUser
};
