const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createCms = {
  body: Joi.object().keys({
    type : Joi.string(),
    description : Joi.string().required(),
    title : Joi.string().required(),
    metaDescription: Joi.string(),
    images: Joi.string(),
    url: Joi.string(),
    status : Joi.boolean().required()
  }),
};

const getCmss = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCms = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    cmsId: Joi.string().custom(objectId),
  }),
};

const updateCms = {
  params: Joi.object().keys({
    cmsId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        url: Joi.string(),
        type : Joi.string(),
        description : Joi.string(),
        title : Joi.string(),
        metaDescription: Joi.string(),
        images: Joi.string(),
        status : Joi.boolean()  
    }),
};

const deleteCms = {
  params: Joi.object().keys({
    cmsId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createCms,
  getCmss,
  getCms,
  updateCms,
  deleteCms,
};
