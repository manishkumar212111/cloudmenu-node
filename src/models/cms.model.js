const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const cmsSchema = mongoose.Schema(
  {
    type : {
        type : String
    },
    url : {
      type : String,
    }, 
    description: {
        type: String 
    },
    title: {
        type : String
    },
    metaDescription: {
        type : String
    },
    images: {
        type : String
    },
    status : {
        type : Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cmsSchema.plugin(toJSON);
cmsSchema.plugin(paginate);

  
const Cms = mongoose.model('Cms', cmsSchema);

module.exports = Cms;
