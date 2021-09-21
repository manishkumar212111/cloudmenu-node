const httpStatus = require('http-status');
const { Category, Restaurant, Product} = require('../models');
// const Moment = require('moment')
const ApiError = require('../utils/ApiError');
// const { sendOTP  } = require('../services/email.service');


/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody , user) => {
  categoryBody.user = user.id;
  const restaurant = await Restaurant.findOne({user : user}).select('_id');
  if(!restaurant){
    throw new ApiError(httpStatus.NOT_FOUND, "Can't find restaurant profile for this user");
  }
  categoryBody.restaurant = restaurant.id; 
  const category = await Category.create({ ...categoryBody });
  return category;
};

/**
 * Query for categorys
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCategorys = async (filter, options) => {
    if(filter.name && filter.name !== ""){
      filter.name = {'$regex': filter.name}
    }
    
    return await Category.paginate(filter, options , async (option) => {
        return await Category.find(option.filter).populate('user', { email: 1 }).
        sort(option.sort).skip(option.skip).limit(option.limit).exec()
      });
//   const categorys = await Category.paginate(filter, options);
//   return categorys;
};

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategoryById = async (id) => {
  return await Category.findById(id);
};

/**
 * Update category by id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<Category>}
 */
const updateCategoryById = async (categoryId, updateBody) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  if (updateBody.email && (await Category.isEmailTaken(updateBody.email, categoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(category, updateBody);
  await category.save();
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategoryById = async (categoryId) => {
  const category = await getCategoryById(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  let product = await Product.deleteMany({ category : categoryId })
  await category.remove();
  return product;
};

const getCategoryByUser = async (userId) => {
  const category = await Category.findOne({
    user : userId
  })
  if(!category){
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  return category;
}
module.exports = {
  createCategory,
  queryCategorys,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getCategoryByUser
};
