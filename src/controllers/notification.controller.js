const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { notificationService, restaurantService } = require('../services');
const config = require('../config/config');
require("dotenv").config();

const createNotification = catchAsync(async (req, res) => {
  let body = req.body;
  const resturant = await restaurantService.getRestaurantByUser(req.user.id);
  body.restaurant = resturant.id;
  const notification = await notificationService.createNotification(body, req.user);
  res.send(notification)
});

const getNotifications = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status','restaurant', 'isOpened']);
  const options = pick(req.query, ['limit']);
  options.limit = 10000;
  
  const resturant = await restaurantService.getRestaurantByUser(req.user.id);
  filter.restaurant = resturant.id;
  
  const result = await notificationService.queryNotifications(filter, options);
  res.send(result);
});

const getNotification = catchAsync(async (req, res) => {
  let notification = await notificationService.getNotificationById(req.params.notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }
  res.send(notification);
});

const updateNotification = catchAsync(async (req, res) => {
  let body = req.body;
  const notification = await notificationService.updateNotificationById(req.params.notificationId, body);
  res.send(notification);
});

const deleteNotification = catchAsync(async (req, res) => {
  await notificationService.deleteNotificationById(req.params.notificationId);
  res.send({ status : true });
});

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
};
