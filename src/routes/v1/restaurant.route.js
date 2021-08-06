const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const RestaurantValidation = require('../../validations/restaurant.validation');
const RestaurantController = require('../../controllers/restaurant.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageRestaurants'), validate(RestaurantValidation.createRestaurant), RestaurantController.createRestaurant)
  .get(auth('getRestaurants'), validate(RestaurantValidation.getRestaurants), RestaurantController.getRestaurants);


router
  .route('/user/restaurant')
  .get(auth('manageRestaurants'), validate(RestaurantValidation.getRestaurant), RestaurantController.getRestaurantByUser)

router
  .route('/:restaurantId')
  .get(auth('manageRestaurants'), validate(RestaurantValidation.getRestaurant), RestaurantController.getRestaurant)
  .patch(auth('manageRestaurants'), validate(RestaurantValidation.updateRestaurant), RestaurantController.updateRestaurant)
  .delete(auth('manageRestaurants'), validate(RestaurantValidation.deleteRestaurant), RestaurantController.deleteRestaurant);


module.exports = router;
