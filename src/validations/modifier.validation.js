const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createModifier = {
  body: Joi.object().keys({
    name : Joi.string(),
    nameAr : Joi.string(),
    min : Joi.number(),
    max : Joi.number(),
    isRequired : Joi.boolean(),
    modifiers : Joi.array()
  }),
};

const getModifiers = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string(),
    restaurant: Joi.custom(objectId)
  }),
};

const getModifier = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    modifierId: Joi.string().custom(objectId),
  }),
};

const updateModifier = {
  params: Joi.object().keys({
    modifierId: Joi.string().custom(objectId),

  }),
  body: Joi.object()
    .keys({
      name : Joi.string(),
      nameAr : Joi.string(),
      min : Joi.number(),
      max : Joi.number(),
      isRequired : Joi.boolean(),
      modifiers : Joi.array()
    }),
};

const deleteModifier = {
  params: Joi.object().keys({
    modifierId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createModifier,
  getModifiers,
  getModifier,
  updateModifier,
  deleteModifier,
};
