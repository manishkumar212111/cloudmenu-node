const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const EnquiryValidation = require('../../validations/enquiry.validation');
const EnquiryController = require('../../controllers/enquiry.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageEnquirys'), validate(EnquiryValidation.createEnquiry), EnquiryController.createEnquiry)
  .get(auth('getEnquirys'), validate(EnquiryValidation.getEnquirys), EnquiryController.getEnquirys);


router
  .route('/user/enquiry')
  .get(auth('manageEnquirys'), validate(EnquiryValidation.getEnquiry), EnquiryController.getEnquiryByUser)

router
  .route('/:enquiryId')
  .get(auth('manageEnquirys'), validate(EnquiryValidation.getEnquiry), EnquiryController.getEnquiry)
  .patch(auth('manageEnquirys'), validate(EnquiryValidation.updateEnquiry), EnquiryController.updateEnquiry)
  .delete(auth('manageEnquirys'), validate(EnquiryValidation.deleteEnquiry), EnquiryController.deleteEnquiry);


module.exports = router;
