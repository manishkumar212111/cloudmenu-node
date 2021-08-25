const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ModifierValidation = require('../../validations/modifier.validation');
const ModifierController = require('../../controllers/modifier.controller');

const router = express.Router();


router
  .route('/')
  .post(auth('manageModifiers'), validate(ModifierValidation.createModifier), ModifierController.createModifier)
  .get(auth('getModifiers'), validate(ModifierValidation.getModifiers), ModifierController.getModifiers);


router
  .route('/user/modifier')
  .get(auth('manageModifiers'), validate(ModifierValidation.getModifier), ModifierController.getModifierByUser)

router
  .route('/:modifierId')
  .get(auth('manageModifiers'), validate(ModifierValidation.getModifier), ModifierController.getModifier)
  .patch(auth('manageModifiers'), validate(ModifierValidation.updateModifier), ModifierController.updateModifier)
  .delete(auth('manageModifiers'), validate(ModifierValidation.deleteModifier), ModifierController.deleteModifier);


module.exports = router;
