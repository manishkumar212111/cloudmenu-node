const httpStatus = require('http-status');
const { Order, User, Restaurant, Notification} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');

const dotenv = require('dotenv')
dotenv.config()

const webpush = require('web-push')
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

/**
 * Create a order
 * @param {Object} orderBody
 * @returns {Promise<Order>}
 */
const createOrder = async (orderBody , user) => {
//   orderBody.user = user.id;
  let count = await Order.find({ restaurant : orderBody.restaurant});
  const order = await Order.create({ ...orderBody, orderNo : count.length +1 });

  let userData = await Restaurant.findById(orderBody.restaurant).populate("user");
  console.log(userData);

  // send user push notification
  if(userData && userData?.user?.subscriptionData){
    const payload = JSON.stringify({
      title: 'New Order',
      body: 'You have new order with id '+ order.orderNo,
    })
  
    await webpush.sendNotification(JSON.parse(userData?.user?.subscriptionData), payload)
  
  }
  
  // bell notification
  await Notification.create({
    title: "New Order",
    description: `New order recieved with order id #${order.orderNo}`,
    orderId: order.id || order._id,
    restaurant:  orderBody.restaurant
  })

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
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
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
