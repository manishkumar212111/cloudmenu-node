const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    products : Joi.array().required(),
    restaurant : Joi.string().custom(objectId).required(),
    currency : Joi.string(),

  }),
};

const getOrders = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    restaurant: Joi.custom(objectId)
  }),
};

const getOrder = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    products : Joi.array().required(),
    restaurant : Joi.string().custom(objectId).required(),
    currency : Joi.string(),
  }),
  body: Joi.object()
    .keys({
        name : Joi.string()    
    }),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
