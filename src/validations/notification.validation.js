const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createNotification = {
  body: Joi.object().keys({
    title : Joi.string().required(),
    description: Joi.string(),
    settings: Joi.string(),
  }),
};

const getNotifications = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    restaurant : Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    isOpened: Joi.boolean(),
    page: Joi.number().integer(),
  }),
};

const getNotification = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};

const updateNotification = {
  params: Joi.object().keys({
    notificationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        title : Joi.string(),
        isOpened: Joi.boolean(),
        description: Joi.string(),
        settings: Joi.string(),
    }),
};

const deleteNotification = {
  params: Joi.object().keys({
    notificationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
  deleteNotification,
};
