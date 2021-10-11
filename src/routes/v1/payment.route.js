const express = require('express');
const validate = require('../../middlewares/validate');
const paymentController = require('../../controllers/payment.controller');
const router = express.Router();

router.post('/checkout', paymentController.create);
router.get('/capture-payment', paymentController.capturePayment);


module.exports = router;
