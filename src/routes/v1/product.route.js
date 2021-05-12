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
  .get(auth('getProducts'), validate(ProductValidation.getProduct), ProductController.getProduct)
  .patch(auth('manageProducts'), validate(ProductValidation.updateProduct), ProductController.updateProduct)
  .delete(auth('manageProducts'), validate(ProductValidation.deleteProduct), ProductController.deleteProduct);


module.exports = router;
