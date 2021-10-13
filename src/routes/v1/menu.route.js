const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const MenuValidation = require('../../validations/menu.validation');
const MenuController = require('../../controllers/menu.controller');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "uploads-"+new Date().toISOString()+Math.random(9)+file.originalname)
  }
})
var upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'coverImage', maxCount: 1 }])


const router = express.Router();


router
  .route('/')
  .post(auth('manageMenus'),cpUpload, validate(MenuValidation.createMenu), MenuController.createMenu)
  .get(auth('getMenus'), validate(MenuValidation.getMenus), MenuController.getMenus);

router
  .route('/:menuId')
  .put(auth('manageMenus'),cpUpload, validate(MenuValidation.updateMenu), MenuController.updateMenu)
  .get(auth('getMenus'), validate(MenuValidation.getMenu), MenuController.getMenu)
  .delete(auth('manageMenus'), validate(MenuValidation.deleteMenu), MenuController.deleteMenu);


module.exports = router;
