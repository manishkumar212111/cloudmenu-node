const { array, number } = require('joi');
const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const enquirySchema = mongoose.Schema(
  {
    email : {
        type : String
    },  
    mobile: {
        type: String 
    },
    name: {
      type: String 
    },
    subject : {
      type: String
    },
    description: {
        type : String
    },
    status : {
        type : Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
enquirySchema.plugin(toJSON);
enquirySchema.plugin(paginate);

  
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
