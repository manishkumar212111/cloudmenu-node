const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createRestaurant = {
  body: Joi.object().keys({
    title : Joi.string(),
    logo_url : Joi.string(),
    description : Joi.string(),
    planName: Joi.string(),
    planDetail: Joi.object(),
    name : Joi.string(),
    nameAr : Joi.string(),
    address: Joi.string(),
    manager_name: Joi.string(),
    email: Joi.string(),
    mobile: Joi.string(),
    ccode : Joi.string(),
    menu: Joi.string().custom(objectId),
    documents: Joi.array(),
    full_address: Joi.string(),
    status: Joi.number(),
    coverImage: Joi.string(),
    openingTime: Joi.string(),
    closingTime: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    currency: Joi.string(),
    taxRate: Joi.string(),
    taxStatus: Joi.boolean(),
    noOfTable: Joi.number(),
    bankDetail: Joi.string(),
    settings: Joi.string(),
    banner_url: Joi.string()
  }),
};

const getRestaurants = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    status: Joi.number(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    user: Joi.custom(objectId)
  }),
};

const getRestaurant = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    url_key: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};

const updateRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title : Joi.string(),
      logo_url : Joi.string(),
      description : Joi.string(),
      planName: Joi.string(),
      planDetail: Joi.object(),
      name : Joi.string(),
      nameAr : Joi.string(),
      address: Joi.string(),
      manager_name: Joi.string(),
      email: Joi.string(),
      mobile: Joi.string(),
      ccode : Joi.string(),
      menu: Joi.string().custom(objectId),
      documents: Joi.array(),
      full_address: Joi.string(),
      status: Joi.number(),
      coverImage: Joi.string(),
      openingTime: Joi.string(),
      closingTime: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      currency: Joi.string(),
      taxRate: Joi.string(),
      taxStatus: Joi.boolean(),
      noOfTable: Joi.number(),
      bankDetail: Joi.string(),
      settings: Joi.string(),
      banner_url: Joi.string()
    }),
};

const deleteRestaurant = {
  params: Joi.object().keys({
    restaurantId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
