const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createEnquiry = {
  body: Joi.object().keys({
    email : Joi.string().required(),
    mobile : Joi.string().required(),
    name : Joi.string().required(),
    subject : Joi.string().required(),
    description : Joi.string().required(),
    status : Joi.number(),

  }),
};

const getEnquirys = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    restaurant: Joi.custom(objectId)
  }),
};

const getEnquiry = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    enquiryId: Joi.string().custom(objectId),
  }),
};

const updateEnquiry = {
  params: Joi.object().keys({
    enquiryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        email : Joi.string(),
        mobile : Joi.string(),
        name : Joi.string(),
        subject : Joi.string(),
        description : Joi.string(),
        status : Joi.number(), 
    }),
};

const deleteEnquiry = {
  params: Joi.object().keys({
    enquiryId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createEnquiry,
  getEnquirys,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
