var multer  = require('multer')
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const RestaurantValidation = require('../../validations/restaurant.validation');
const RestaurantController = require('../../controllers/restaurant.controller');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "uploads-"+new Date().toISOString()+file.originalname)
  }
})
var upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'businessDoc', maxCount: 1 }, { name: 'coverImage', maxCount: 1 } , { name: 'logoImage', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }])

const uploadNone = multer()


const router = express.Router();

router
  .route('/')
  .post(auth('manageRestaurants'), cpUpload, validate(RestaurantValidation.createRestaurant), RestaurantController.createRestaurant)
  .get(auth('getRestaurants'), validate(RestaurantValidation.getRestaurants), RestaurantController.getRestaurants);


router
  .route('/user/restaurant')
  .get(auth('manageRestaurants'), uploadNone.none() , validate(RestaurantValidation.getRestaurant), RestaurantController.getRestaurantByUser)

router
  .route('/:restaurantId')
  .get(auth('manageRestaurants'), validate(RestaurantValidation.getRestaurant), RestaurantController.getRestaurant)
  .post(auth('manageRestaurants'), cpUpload , validate(RestaurantValidation.updateRestaurant), RestaurantController.updateRestaurant)
  .delete(auth('manageRestaurants'), validate(RestaurantValidation.deleteRestaurant), RestaurantController.deleteRestaurant);


module.exports = router;
