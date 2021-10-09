const httpStatus = require("http-status");
const { Notification, User, Basic_info, Restaurant, Product, Category, Modifier } = require("../models");
const Moment = require("moment");
const ApiError = require("../utils/ApiError");
const { sendOTP } = require("../services/email.service");
const stripeService = require("../services/stripe.service");
var mongoose = require("mongoose");
const csvtojson = require("csvtojson");

/**
 * Create a notification
 * @param {Object} notificationBody
 * @returns {Promise<Notification>}
 */
const createNotification = async (notificationBody, user) => {
  let notification = new Notification(notificationBody);  
  
  notification = await notification.save();

  return notification;
};

/**
 * Query for notifications
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNotifications = async (filter, options = {}) => {
  console.log(filter, "kkjhkjhkj")
  let res = await Notification.aggregate([
    {$match : {...filter, restaurant: mongoose.Types.ObjectId(filter.restaurant)}}, 
    {
      $sort : {
        createdAt : -1
      }
    },
    {
      $lookup: {
        from:"orders",
        localField: "orderId",
        foreignField: "_id",
        as: "order"
     }},
     {
       $match: {
      "order.status": "Pending"
     }
     },
    //  {
    //    $project: {
    //      _id: 1,
    //      id: 1,
    //      title: 1,
    //      description : 1 
    //    }
    //  }
    
  ]);
  console.log(res)
  return { results : res}
  // return await Notification.paginate(filter, options , async (option) => {
  //     return await Notification.find(option.filter).
  //     sort(option.sort).skip(option.skip).limit(option.limit).exec()
  //   });
};

/**
 * Get notification by id
 * @param {ObjectId} id
 * @returns {Promise<Notification>}
 */
const getNotificationById = async (id) => {
  return await Notification.findById(id);
};

/**
 * Update notification by id
 * @param {ObjectId} notificationId
 * @param {Object} updateBody
 * @returns {Promise<Notification>}
 */
const updateNotificationById = async (notificationId, updateBody) => {
  const notification = await getNotificationById(notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");
  }
  
  Object.assign(notification, updateBody);
  await notification.save();
  return notification;
};

/**
 * Delete notification by id
 * @param {ObjectId} notificationId
 * @returns {Promise<Notification>}
 */
const deleteNotificationById = async (notificationId) => {
  const notification = await getNotificationById(notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, "Notification not found");
  }
  await notification.remove();
  return notification;
};
module.exports = {
  createNotification,
  queryNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
