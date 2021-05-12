const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { notificationTypes } = require("../config/constants")

const bindNotofications = () => {
  let obj = {};
  notificationTypes.forEach(element => {
    obj[element] = false;
  })
  return obj;
}
const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    early_access : {
      type: Boolean,
      default: false    
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    terms_condition: {
      type: Boolean,
      default: true    
    },
    social_url: {
      type: Array,
      default : [
        { text : "insta" , url: ""},
        { text : "youtube" , url: ""},
        { text : "tiktok" , url: ""},
        { text : "twitter" , url: ""}
      ]
    },
    category: {
      type : Array,
      default: []
    },
    style: {
      type: Object,
      default: {
        logoUrl : "",
        bannerUrl: "",
        theme: "",
        buttonColor: ""
      }
    },
    password: {
      type: String,
      trim: true,
      // minlength: 8,
      // validate(value) {
      //   if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      //     throw new Error('Password must contain at least one letter and one number');
      //   }
      // },
      private: true, // used by the toJSON plugin
    },
    contact: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if userName is already taken
 * @param {string} userName - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
 userSchema.statics.isUserNameTaken = async function (userName, excludeUserId) {
  const user = await this.findOne({ userName, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
