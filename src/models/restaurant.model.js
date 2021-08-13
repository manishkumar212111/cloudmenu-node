const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default : ""
    },
    // qr_code_url: {
    //   type: String
    // },
    logo_url: {
        type: String,
        default : ""
    },
    // qr_text: {
    //     type : String
    // },
    description : {
        type : String
    },
    social_links : {
        type: Array
    },
    planName : {
        type: String
    },
    planDetail : {
        type: Object,
        default : {
            // start : "",
            // expiry : ""
        }
    }, 
    name: {
        type : String
    },
    address: {
        type : String
    },
    manager_name: {
        type : String
    },
    email: {
        type : String
    },
    mobile: {
        type : String
    },
    ccode: {
        type : String
    },
    documents: {
        type : Array
    },
    full_address: {
        type : String
    },
    status: {
        type : Number,
        default : 1
    },
    coverImage: {
        type : String
    },
    openingTime : {
        type: String
    },
    closingTime : {
        type: String
    },
    city: {
        type : String
    },
    state: {
        type : String
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,  
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The restaurant's email
//  * @param {ObjectId} [excludeUserId] - The id of the restaurant to be excluded
//  * @returns {Promise<boolean>}
//  */
//  restaurantSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const restaurant = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!restaurant;
//   };

  
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;