const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const OrderValidation = require('../../validations/order.validation');
const OrderController = require('../../controllers/order.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageOrders'), validate(OrderValidation.createOrder), OrderController.createOrder)
  .get(auth('getOrders'), validate(OrderValidation.getOrders), OrderController.getOrders);


router
  .route('/user/order')
  .get(auth('manageOrders'), validate(OrderValidation.getOrder), OrderController.getOrderByUser)

router
  .route('/:orderId')
  .get(auth('manageOrders'), validate(OrderValidation.getOrder), OrderController.getOrder)
  .patch(auth('manageOrders'), validate(OrderValidation.updateOrder), OrderController.updateOrder)
  .delete(auth('manageOrders'), validate(OrderValidation.deleteOrder), OrderController.deleteOrder);


module.exports = router;
