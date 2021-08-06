const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const qrSchema = mongoose.Schema(
  {
    qr_code: {
      type: String,
      trim: true,
      default : ""
    },
    qr_text: {
        type: String,
        default : ""
    },
    // qr_text: {
    //     type : String
    // },
    background_color : {
        type : String
    },
    table_no : {
        type : String
    },
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        required: true,  
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
qrSchema.plugin(toJSON);
qrSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The qr's email
//  * @param {ObjectId} [excludeUserId] - The id of the qr to be excluded
//  * @returns {Promise<boolean>}
//  */
//  qrSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const qr = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!qr;
//   };

  
const Qr = mongoose.model('Qr', qrSchema);

module.exports = Qr;
