const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const menuSchema = mongoose.Schema(
  {
    name : {
        type : String,
        unique: true
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
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
menuSchema.plugin(toJSON);
menuSchema.plugin(paginate);

  
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
