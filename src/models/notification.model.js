const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const notificationSchema = mongoose.Schema(
  {
    title : {
        type : String,
    },
    description: {
        type : String
    },
    orderId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Order',
    },  
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        required: true,  
    },
    isOpened: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

notificationSchema.statics.isNameTaken = async function (name ) {
  const user = await this.findOne({ name });
  return !!user;
};
  
const notification = mongoose.model('Notification', notificationSchema);

module.exports = notification;
