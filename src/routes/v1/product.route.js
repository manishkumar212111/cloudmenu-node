const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ProductValidation = require('../../validations/product.validation');
const ProductController = require('../../controllers/product.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageProducts'), validate(ProductValidation.createProduct), ProductController.createProduct)
  .get(auth('getProducts'), validate(ProductValidation.getProducts), ProductController.getProducts);


router
.route('/user')
.get(auth('getProducts'), validate(ProductValidation.getProductUser), ProductController.getProductsByUser)
.post(auth('getProducts'), validate(ProductValidation.updateUserInfo), ProductController.addUserInfo)

router
  .route('/:productId')
  .post(auth('getProducts'), validate(ProductValidation.addToStore), ProductController.addToStore)
  .get(auth('getProducts'), validate(ProductValidation.getProduct), ProductController.getProduct)
  .patch(auth('manageProducts'), validate(ProductValidation.updateProduct), ProductController.updateProduct)
  .delete(auth('manageProducts'), validate(ProductValidation.deleteProduct), ProductController.deleteProduct);

router.get('/product/:userName', validate(ProductValidation.empty), ProductController.getProductsByUserName)
router.get('/product/detail/:productId', validate(ProductValidation.empty), ProductController.getProduct)

router.post('/product/csv/upload', validate(ProductValidation.fileUpload), ProductController.uploadCsv)


module.exports = router;
