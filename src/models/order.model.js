const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
      required: true,  
    },
    products: [{
        productId : {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Product',
            required: true,  
        },
        quantity: {
            type : Number,
            default: 1
        },
        listingPrice: {
            type : Number
        },
        sellingPrice: {
            type : Number
        },
        comments: {
            type : String
        }
    }],
    status : {
        type : Number,
        default : 1
    },
    currency: {
      type: String
    },
    totalListingPrice : {
      type : Number
    },
    totalSellingPrice : {
      type : Number
    },
    tax : {
      type : Number
    },
    paymentStatus: {
        type : String
    },
    taxnId: {
        type : String
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The order's email
//  * @param {ObjectId} [excludeUserId] - The id of the order to be excluded
//  * @returns {Promise<boolean>}
//  */
//  orderSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const order = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!order;
//   };

  
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
