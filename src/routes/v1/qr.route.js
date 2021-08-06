const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const QrValidation = require('../../validations/qr.validation');
const QrController = require('../../controllers/qr.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageQrs'), validate(QrValidation.createQr), QrController.createQr)
  .get(auth('getQrs'), validate(QrValidation.getQrs), QrController.getQrs);

router
  .route('/:qrId')
  .get(auth('manageQrs'), validate(QrValidation.getQr), QrController.getQr)
  .patch(auth('manageQrs'), validate(QrValidation.updateQr), QrController.updateQr)
  .delete(auth('manageQrs'), validate(QrValidation.deleteQr), QrController.deleteQr);


module.exports = router;
