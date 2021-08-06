const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const transactionSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
      required: true,  
    },
    order: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
        required: true,  
    },
    status : {
        type : String,
        default : ""
    },
    currency: {
      type: String
    },
    paymentResponse : {
      type : Object
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
transactionSchema.plugin(toJSON);
transactionSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The transaction's email
//  * @param {ObjectId} [excludeUserId] - The id of the transaction to be excluded
//  * @returns {Promise<boolean>}
//  */
//  transactionSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const transaction = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!transaction;
//   };

  
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
