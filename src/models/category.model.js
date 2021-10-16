const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name : {
        type : String,
    },
    nameAr : {
      type : String,
    },  
    restaurant: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Restaurant',
        required: true,  
    },
    menu: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Menu',
      required: true,  
    },
    sort:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

  
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
