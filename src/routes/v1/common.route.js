const express = require('express');
const validate = require('../../middlewares/validate');
const enquiryValidation = require('../../validations/enquiry.validation');
const enquiryController = require('../../controllers/enquiry.controller');

const router = express.Router();

router.post('/enquiry', validate(enquiryValidation.createEnquiry), enquiryController.createEnquiry);

module.exports = router;
