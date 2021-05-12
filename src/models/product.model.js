const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { notificationTypes } = require("../config/constants")

const productSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      trim: true,
      default : ""
    },
    productName: {
        type: String,
        trim: true,
        default : ""
    },
    productDescription: {
        type: String,
        trim: true,
        default : ""
    },
    promoCode: {
        type: String,
        trim: true,
        default : ""
    },
    imageType: {
        type: String,
        trim: true,
        default : ""
    
    },
    imgUrl: {
        type: String,
        trim: true,
        default : ""
    
    },
    price : {
      type : Number,
      default : 0
    },
    url: {
        type: String,
        trim: true,
        default : ""
        
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,  
    },
    status : {
        type : Number,
        default : 1
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The product's email
//  * @param {ObjectId} [excludeUserId] - The id of the product to be excluded
//  * @returns {Promise<boolean>}
//  */
//  productSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const product = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!product;
//   };

  
const product = mongoose.model('product', productSchema);

module.exports = product;
