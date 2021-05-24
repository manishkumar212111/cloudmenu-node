const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    brandName: {
      type: String,
      trim: true,
      default : ""
    },
    user_type: {
      type: String,
      default: "user"
    },
    productName: {
        type: String,
        trim: true,
        default : ""
    },
    category: {
      type: String,
      trim: true,
      default : ""
    
    },
    productType: {
      type: String,
      default: ""
    },
    productDescription: {
        type: String,
        trim: true,
        default : ""
    },
    promoCode: {
        type: String,
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
    originalProductId : {
      type: mongoose.SchemaTypes.ObjectId,
      default: ''
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
