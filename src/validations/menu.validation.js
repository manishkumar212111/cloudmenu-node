const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMenu = {
  body: Joi.object().keys({
    name : Joi.string().required(),
    bannerImage: Joi.string(),
    settings: Joi.string(),
  }),
};

const getMenus = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    restaurant : Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    settings: Joi.string(),
    page: Joi.number().integer(),
  }),
};

const getMenu = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

const updateMenu = {
  params: Joi.object().keys({
    menuId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name : Joi.string(),
        bannerImage: Joi.string(),
        settings: Joi.string()
    }),
};

const deleteMenu = {
  params: Joi.object().keys({
    menuId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMenu,
  getMenus,
  getMenu,
  updateMenu,
  deleteMenu,
};
