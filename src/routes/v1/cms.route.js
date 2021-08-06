const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const CmsValidation = require('../../validations/cms.validation');
const CmsController = require('../../controllers/cms.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageCmss'), validate(CmsValidation.createCms), CmsController.createCms)
  .get(auth('getCmss'), validate(CmsValidation.getCmss), CmsController.getCmss);


router
  .route('/user/cms')
  .get(auth('manageCmss'), validate(CmsValidation.getCms), CmsController.getCmsByUser)

router
  .route('/:cmsId')
  .get(auth('manageCmss'), validate(CmsValidation.getCms), CmsController.getCms)
  .patch(auth('manageCmss'), validate(CmsValidation.updateCms), CmsController.updateCms)
  .delete(auth('manageCmss'), validate(CmsValidation.deleteCms), CmsController.deleteCms);


module.exports = router;
