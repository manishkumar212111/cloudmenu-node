const express = require('express');
const validate = require('../../middlewares/validate');
const enquiryValidation = require('../../validations/enquiry.validation');
const productValidation = require('../../validations/product.validation');

const enquiryController = require('../../controllers/enquiry.controller');
const productController = require('../../controllers/product.controller');

const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');

const restaurantValidation = require('../../validations/restaurant.validation');
const restaurantController = require('../../controllers/restaurant.controller');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.post('/enquiry', validate(enquiryValidation.createEnquiry), enquiryController.createEnquiry);
router.get('/product', validate(productValidation.getProducts), productController.getProducts);
router.get('/category', validate(categoryValidation.getCategorys), categoryController.getCategorys);
router.get('/restaurant/:restaurantId', validate(restaurantValidation.getRestaurant), restaurantController.getRestaurant);
router.post('/order', validate(orderValidation), orderController.createOrder);

module.exports = router;
