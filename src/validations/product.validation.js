const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    brandName : Joi.string().required(),
    productName : Joi.string(),
    productDescription : Joi.string(),
    promoCode: Joi.string(),
    url: Joi.string(),
    user_type: Joi.string(),
    imgUrl: Joi.string(),
    sold_at: Joi.string(),
    category: Joi.string(),
    imageType: Joi.string(),
    price : Joi.number(),
    productType: Joi.string()
  }),
};

const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    user_type: Joi.string(),
    category: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    user: Joi.custom(objectId)
  }),
};

const getProduct = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    user_type: Joi.string(),
    category: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      brandName : Joi.string(),
      productName : Joi.string(),
      productDescription : Joi.string(),
      promoCode: Joi.string(),
      url: Joi.string(),
      sold_at: Joi.string(),
      category: Joi.string(),
      user_type: Joi.string(),
      imgUrl: Joi.string(),
      productType: Joi.string(),
      imageType: Joi.string(),
      price : Joi.number()
    }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const getProductUser = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),  
  })
}

const updateUserInfo = {

}

const empty = {
  
}
const addToStore = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
}

const fileUpload = {
  body: Joi.object()
    .keys({
      userId : Joi.string().custom(objectId),
    })
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductUser,
  updateUserInfo,
  empty,
  fileUpload,
  addToStore
};
