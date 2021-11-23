const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const restaurantSchema = mongoose.Schema(
  {
    menu: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Menu'
    }, 
    title: {
      type: String,
      trim: true,
      default : ""
    },
    logo_url: {
        type: String,
        default : ""
    },
    banner_url: {
        type: String,
        default : ""
    },
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
            start : "",
            expiry : ""
        }
    }, 
    name: {
        type : String
    },
    nameAr: {
        type : String
    },
    url_key:{
        type : String,
        unique: true
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
    businessDoc: {
        type : String
    },
    full_address: {
        type : String
    },
    noOfTable:{
        type: Number
    },
    currency: {
        type: String
    },
    taxRate: {
        type: Number
    },
    taxStatus: {
        type: Boolean
    },
    bankDetail: {
        type:Object,
        default: {
            bankName: "",
            companyName: "",
            IBAN: ""
        }
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
                Mada: false,
                applePay: false
            }
        }
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
        unique : true 
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
restaurantSchema.plugin(toJSON);
restaurantSchema.plugin(paginate);

/**
 * Check if userName is already taken
 * @param {string} userName - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 restaurantSchema.statics.isNameTaken = async function (url_key, excludeUserId) {
    const restaurant = await this.findOne({ url_key, _id: { $ne: excludeUserId } });
    return !!restaurant;
  };

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
