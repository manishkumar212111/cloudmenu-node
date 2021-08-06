const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const CategoryValidation = require('../../validations/category.validation');
const CategoryController = require('../../controllers/category.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageCategorys'), validate(CategoryValidation.createCategory), CategoryController.createCategory)
  .get(auth('getCategorys'), validate(CategoryValidation.getCategorys), CategoryController.getCategorys);


router
  .route('/user/category')
  .get(auth('manageCategorys'), validate(CategoryValidation.getCategory), CategoryController.getCategoryByUser)

router
  .route('/:categoryId')
  .get(auth('manageCategorys'), validate(CategoryValidation.getCategory), CategoryController.getCategory)
  .patch(auth('manageCategorys'), validate(CategoryValidation.updateCategory), CategoryController.updateCategory)
  .delete(auth('manageCategorys'), validate(CategoryValidation.deleteCategory), CategoryController.deleteCategory);


module.exports = router;
