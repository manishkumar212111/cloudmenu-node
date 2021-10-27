const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCategory = {
  body: Joi.object().keys({
    name : Joi.string().required(),
    nameAr : Joi.string().required(),
    restaurant: Joi.string().custom(objectId),
    menu : Joi.string().custom(objectId).required(),
  }),
};

const getCategorys = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    menu : Joi.string().custom(objectId),
    restaurant: Joi.custom(objectId)
  }),
};

const getCategory = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};

const updateCategory = {
  params: Joi.object().keys({
    categoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        name : Joi.string(),
        nameAr : Joi.string(),
        sort: Joi.number(),
        categoryList: Joi.array()
    }),
};

const deleteCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createCategory,
  getCategorys,
  getCategory,
  updateCategory,
  deleteCategory,
};
