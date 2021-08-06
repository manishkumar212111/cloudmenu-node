const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    // user: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: 'User',
    //     required: true,  
    // },
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
      required: true,  
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,  
    },
    title: {
      type : String
    },
    description: {
      type: String
    },
    inStock: {
      type : Boolean,
      default: true
    },
    status : {
        type : Number,
        default : 1
    },
    images : {
      type: Array
    },
    currency: {
      type: String
    },
    listingPrice : {
      type : Number
    },
    sellingPrice : {
      type : Number
    },
    discount : {
      type : Number
    }
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

  
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
