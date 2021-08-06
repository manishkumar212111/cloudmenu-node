const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const categorySchema = mongoose.Schema(
  {
    name : {
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

  
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
