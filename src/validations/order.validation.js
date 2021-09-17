const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    products : Joi.object().required(),
    restaurant : Joi.string().custom(objectId).required(),
    status : Joi.string(),
    subTotalAmount: Joi.number(),
    tax: Joi.number(),
    totalAmount: Joi.number(),
    orderType: Joi.string(),
    orderNote: Joi.string(),
    paymentType: Joi.string(),
    paymentStatus: Joi.string(),
    tableNo: Joi.string()
  }),
};

const getOrders = {
  query: Joi.object().keys({
    status: Joi.string(),
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
    orderId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      products : Joi.object(),
      restaurant : Joi.string().custom(objectId),
      status : Joi.string(),
      subTotalAmount: Joi.number(),
      tax: Joi.number(),
      totalAmount: Joi.number(),
      orderType: Joi.string(),
      orderNote: Joi.string(),
      paymentType: Joi.string(),
      paymentStatus: Joi.string(),
      tableNo: Joi.string()
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
