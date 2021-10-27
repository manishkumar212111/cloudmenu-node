const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const menuSchema = mongoose.Schema(
  {
    name : {
        type : String,
    },  
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        required: true,  
    },
    bannerImage: {
        type: String
    },
    coverImage: {
        type: String
    },
    settings:{
      type: Object,
      default:{
            language: "en",
            digitalPayment: true,
            takeAwayOrder: false,
            payment: {
                cash: true,
                paymentTerminal: true,
                creditCard: true,
                mada: false,
                applePay: false
            }
        }
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

menuSchema.statics.isNameTaken = async function (name ) {
  const user = await this.findOne({ name });
  return !!user;
};
  
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
