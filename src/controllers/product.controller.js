const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { productService, stripeService } = require('../services');
require("dotenv").config();
const stripe = require("stripe")(process.env);

const createProduct = catchAsync(async (req, resp) => {
  const product = await productService.createProduct(req.body, req.user);
  let stripedata = {
    "productId": product.id,
    "name": product.productName,
    "description": product.productDescription,
    "length": 1,
    "width": 1,
    "height": 1,
    "distanceUnit": "in",
    "weight": product.weight ? product.weight : 1,
    "massUnit": "lb",
    "brand": product.brandName,
    "category": product.category,
    "images": [
      product.imgUrl
    ],
    "currency": "USD",
    "amount": product.price * 100
}
  try {
  stripeService.createProduct(stripedata , async (response) => {
    let res = response.data;
    if(res && res.status){
            resp.send(product);
        
    } else {
      await productService.deleteProductById(product.id);
      return resp.send({data : res});
      
      //throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong with stripe');
    }
    req.body.user_type !== 'admin' && resp.send(product);
  })
  } catch(err){
    console.log(err);
  }
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role','user', 'user_type', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.send(result);
});

const getProduct = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  res.send(product);
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.params.productId, req.body);
  res.send(product);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  res.send({ status : true });
});

const getProductsByUser = catchAsync(async (req, res) => {
  res.send(await productService.getProductsByUser(req.query.userId ? req.query.userId : req.user.id));
  // let basic_info = await productService.getuserInfo(req.user.id);
  // res.send({
  //   resume_detail : resumes,
  //   basic_info : basic_info
  // });
});

const addUserInfo = catchAsync(async (req, res) => {
  let resumes = await productService.addUserInfo(req.body , req.params.userId ? req.params.userId : req.user.id);
  res.send(resumes);

});

const getProductsByUserName = catchAsync(async (req, res) => {
  console.log(req.query)
  res.send(await productService.getProductsByUserName(req.params.userName, req.query.category));
  
});

const uploadCsv = catchAsync(async (req, res) => {
  // console.log(req.file , req.files , req.body );
  
  res.send(await productService.uploadCsv(req.body.userId , req.file));
});

const addToStore = catchAsync(async (req, res) => {
  let product = await productService.getProductById(req.params.productId);
  let newlyAddedProduct =  await productService.addToStore(req.user.id , product , req.params.productId);

  let stripeData = {
    "accountId": req.user.id,
    "productId": req.params.productId
  }
  try{

    stripeService.createPaymentLink(stripeData , async (response) => {
      let res = response.data;
      if(res && res.status){
        await productService.updateProductById(newlyAddedProduct.id , {
          url : response.data.content.url
        });
      } else {
        return res.send({data : res});

        // //throw new ApiError(httpStatus.SERVICE_UNAVAILABLE, 'Something went wrong with stripe');
      }
    })
    res.send();
  } catch(err){
    console.log(err);
  }
});
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByUser,
  addUserInfo,
  getProductsByUserName,
  uploadCsv,
  addToStore
};
