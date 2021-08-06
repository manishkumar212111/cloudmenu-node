const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQr = {
  body: Joi.object().keys({
    qr_code : Joi.string(),
    qr_text : Joi.string(),
    background_color : Joi.string(),
    table_no: Joi.string().required(),
    planDetail: Joi.object(),
    restaurant : Joi.string().custom(objectId).required(),
  }),
};

const getQrs = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    restaurant: Joi.custom(objectId)
  }),
};

const getQr = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    qrId: Joi.string().custom(objectId),
  }),
};

const updateQr = {
  params: Joi.object().keys({
    qrId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        qr_code : Joi.string(),
        qr_text : Joi.string(),
        background_color : Joi.string(),
        social_links: Joi.array(),
        table_no: Joi.string(),
        planDetail: Joi.object(),
        restaurant : Joi.string().custom(objectId),
    }),
};

const deleteQr = {
  params: Joi.object().keys({
    qrId: Joi.string().custom(objectId),
  }),
};


module.exports = {
  createQr,
  getQrs,
  getQr,
  updateQr,
  deleteQr,
};
