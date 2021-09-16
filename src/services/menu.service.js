const httpStatus = require("http-status");
const { Menu, User, Basic_info, Restaurant } = require("../models");
const Moment = require("moment");
const ApiError = require("../utils/ApiError");
const { sendOTP } = require("../services/email.service");
const stripeService = require("../services/stripe.service");
var mongoose = require("mongoose");
const csvtojson = require("csvtojson");

/**
 * Create a menu
 * @param {Object} menuBody
 * @returns {Promise<Menu>}
 */
const createMenu = async (menuBody, user) => {
  menuBody.user = user.id;
  let menuList = await Menu.findOne({ restaurant :menuBody.restaurant  });
  let menu = new Menu(menuBody);  
  console.log(menuList, menu, menuBody.restaurant)
  if(!(menuList && menuList.name)){
    await Restaurant.findByIdAndUpdate(menuBody.restaurant, {menu: menu._id});
  }
  menu = await menu.save();

  return menu;
};

/**
 * Query for menus
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMenus = async (filter, options = {}) => {
  return await Menu.paginate(filter, options , async (option) => {
      return await Menu.find(option.filter).populate('restaurant', "menu").
      sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
    });
  // filter.restaurant = mongoose.Types.ObjectId(filter.restaurant);
  // let menus = await Menu.aggregate([
  //   {
  //     $match: filter,
  //   },
  //   { $sort: { createdDate: -1 } },
  //   {
  //     $lookup: {
  //       from: "categories",
  //       localField: "category",
  //       foreignField: "_id",
  //       as: "categoryDetail",
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$categoryDetail",
  //       details: {
  //         $push: {
  //           id: "$_id",
  //           title: "$title",
  //           titleAr: "$titleAr",
  //           category: "$categoryDetail",
  //           description: "$description",
  //           descriptionAr: "$descriptionAr",
  //           imageUrl: "$imageUrl",
  //           sellingPrice: "$sellingPrice",
  //           sellingPriceAr: "$sellingPriceAr",
  //           modifierGroup: "$modifierGroup",

  //         },
  //       },
  //     },
  //   },

  //   {
  //     $project: {
  //       _id: "$_id",
  //       details: "$details",
  //     },
  //   },
  // ]);
  // return menus;
};

/**
 * Get menu by id
 * @param {ObjectId} id
 * @returns {Promise<Menu>}
 */
const getMenuById = async (id) => {
  return await Menu.findById(id);
};

/**
 * Update menu by id
 * @param {ObjectId} menuId
 * @param {Object} updateBody
 * @returns {Promise<Menu>}
 */
const updateMenuById = async (menuId, updateBody) => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  console.log(updateBody)
  if(updateBody.modifierGroup){
    updateBody.modifierGroup = JSON.parse(updateBody.modifierGroup);
  }
  if (
    updateBody.email &&
    (await Menu.isEmailTaken(updateBody.email, menuId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(menu, updateBody);
  await menu.save();
  return menu;
};

/**
 * Delete menu by id
 * @param {ObjectId} menuId
 * @returns {Promise<Menu>}
 */
const deleteMenuById = async (menuId) => {
  const menu = await getMenuById(menuId);
  if (!menu) {
    throw new ApiError(httpStatus.NOT_FOUND, "Menu not found");
  }
  await menu.remove();
  return menu;
};
module.exports = {
  createMenu,
  queryMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
