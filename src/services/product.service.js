const httpStatus = require("http-status");
const { Product, User, Basic_info, Order } = require("../models");
const Moment = require("moment");
const ApiError = require("../utils/ApiError");
const { sendOTP } = require("../services/email.service");
const stripeService = require("../services/stripe.service");
var mongoose = require("mongoose");
const csvtojson = require("csvtojson");

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const createProduct = async (productBody, user) => {
  productBody.user = user.id;
  if(productBody.modifierGroup){
    console.log(productBody.modifierGroup, typeof productBody.modifierGroup)
    productBody.modifierGroup = productBody.modifierGroup !== "undefined" ? JSON.parse(productBody.modifierGroup): [];
  }
  const product = await Product.create({ ...productBody });
  return product;
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options = {}) => {
  return await Product.paginate(filter, options , async (option) => {
      return await Product.find(option.filter).populate('category').populate('modifierGroup.id').
      sort("sort").skip(option.skip).limit(option.limit).exec()
    });
  // filter.restaurant = mongoose.Types.ObjectId(filter.restaurant);
  // let products = await Product.aggregate([
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
  // return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return await Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductById = async (productId, updateBody) => {
  if(updateBody.productList && JSON.parse(updateBody.productList).length){
    let h= [];
    JSON.parse(updateBody.productList).forEach(async element => {
      h = await Product.findByIdAndUpdate(element.id, { sort: element.sort});
    });
    return {id: "suuceess"};
  }
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  console.log(updateBody)
  if(updateBody.modifierGroup){
    updateBody.modifierGroup = JSON.parse(updateBody.modifierGroup);
  }
  if (
    updateBody.email &&
    (await Product.isEmailTaken(updateBody.email, productId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  await product.remove();
  return product;
};

const getProductsByUser = async (userId) => {
  const product = await Product.find({ user: userId });
  return product;
};

const getuserInfo = async (userId) => {
  let basicInfo = await Basic_info.find({ user: userId });
  if (!basicInfo.length) {
    return new Basic_info({
      first_name: "",
      last_name: "",
      email: "",
      address: {
        address: "",
        status: true,
        city: {
          value: "",
          status: true,
        },
        state: {
          value: "",
          status: true,
        },
        country: {
          value: "",
          status: true,
        },
      },
      dob: "",
      contact: "",
      ccode: "+91",
      willing_to_relocate: "",
      social_account: [
        { type: "linkedin", status: false, url: "" },
        { type: "github", status: false, url: "" },
        { type: "instagram", status: false, url: "" },
        { type: "facebook", status: false, url: "" },
        { type: "twitter", status: false, url: "" },
        { type: "gitlab", status: false, url: "" },
      ],
      user: userId,
    });
  }
  return basicInfo[0];
};

const addUserInfo = async (updateBody, userId) => {
  let basic_info = await Basic_info.find({ user: userId });
  if (!(basic_info && basic_info.length)) {
    const userInfo = await Basic_info.create({ ...updateBody, user: userId });
    return userInfo;
  } else {
    basic_info = await Basic_info.findById(basic_info[0].id);
    Object.assign(basic_info, updateBody);
    await basic_info.save();
    return basic_info;
  }
};

const getProductsByUserName = async (userName, category) => {
  let user = await User.find({ userName: userName });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  let filter = {
    user: user[0].id,
  };
  if (category) {
    filter["category"] = category;
  }
  return await Product.find(filter);
};

const GetDays = (d,Mention_today=false, itm)=>{
  //Mention today mean the array will have today date
  const NameOfMonths = [("Jan"), ("Feb"), ("Mar") , ("Apr"), ("May"), ("Jun"), ("Jul"), ("Aug"), ("Sep"), ("Oct"), ("Nov"), ("Dec")] 
  var DateArray = [];
  var days=d;
  for(var i=0;i<days;i++){
  if(!Mention_today && i==0){i=1;days+=1}
  var date = new Date();
  var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
  var day =last.getDate();
  var month=last.getMonth()+1;
  var year=last.getFullYear();
  const fulld = (Number(day)+'-'+ Number(month)+'-'+Number(year)) // Format date as you like
  var obj = {key: (Number(day)+'-'+ NameOfMonths[Number(month)-1]+'-'+Number(year)) , value: itm[fulld] || 0}
  DateArray.push(obj);
  }
  return DateArray;
}

const getAnalytics = async (filter) => {
  console.log(filter)
  if(filter?.restaurant){
    filter.restaurant = mongoose.Types.ObjectId(filter?.restaurant); 
  }
  var d = new Date();
  d.setDate(d.getDate()-7);
  let result = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: new Date(d) },
        status: "Complete",
        ...filter
      }
    }
  ]);
  console.log(result, "jjhjhkj", filter);
  // calculate total Order in week
  let resultObj = {
    todayOrder: 0,
    todayRevenue: 0,
    totalOrder: 0,
    totalRevenue: 0,
    orderInWeek: {},
    revenueInWeek: {}
  } 

  result && result.map(itm => {
    let date = new Date(itm.createdAt).getDate() + "-" + (new Date(itm.createdAt).getMonth() +1)+ "-" + new Date(itm.createdAt).getFullYear() 
    if(Moment(itm.createdAt).format("MMDDYYYY") == Moment().format("MMDDYYYY")){
      resultObj.todayOrder += 1;
      resultObj.todayRevenue += parseFloat(itm.totalAmount);
        
    }
    resultObj.totalOrder += 1;
    resultObj.totalRevenue += parseFloat(itm.totalAmount);
    resultObj.orderInWeek[date] = (resultObj.orderInWeek[date] || 0) + 1 
    resultObj.revenueInWeek[date] = (resultObj.revenueInWeek[date] || 0) + parseFloat(itm.totalAmount) 
  })

  resultObj.revenueInWeek = GetDays(7 ,true , resultObj.revenueInWeek)
  resultObj.orderInWeek = GetDays(7 ,true , resultObj.orderInWeek)

  return resultObj;
}

const getAnalyticsByDate = async (filter, options={}) => {
  console.log(filter)
  
  let match = {
    status: "Complete" 
  }
  if(filter?.restaurant){
    match['restaurant'] = mongoose.Types.ObjectId(filter?.restaurant); 
  }
  if(filter.from && filter.to){
    match['createdAt']= { $gte: new Date(filter.from) , $lte : new Date(filter.to)}
  }


  console.log(match)
  let result = await Order.aggregate([
    {
      $match: match
    }
  ]);
  // calculate total Order in week
  let resultObj = {
    totalOrder: 0,
    totalRevenue: 0
  } 

  result && result.map(itm => {
    resultObj.totalOrder += 1;
    resultObj.totalRevenue += parseFloat(itm.totalAmount);
  })

  result= await Order.paginate(match, options , async (option) => {
    return await Order.aggregate([
      {
        $match: match
      },
      {
        $lookup:
          {
            from: "restaurants",
            localField: "restaurant",
            foreignField: "_id",
            as: "resto_name"
          }
     },
      {
        $sort: {createdAt: -1}
      },
      {
        $skip: option.skip
      },
      {
        $limit: option.limit
      }
    ]);
    
    
    // await Product.find(option.filter).populate('category').
    // sort(option.sort).skip(option.skip).limit(option.limit).exec()
  });
  return {analytics:  resultObj, orders: result};
}


module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByUser,
  addUserInfo,
  getuserInfo,
  getProductsByUserName,
  getAnalytics,
  getAnalyticsByDate
};
