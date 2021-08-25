const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const ProductValidation = require('../../validations/product.validation');
const ProductController = require('../../controllers/product.controller');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, "uploads-"+new Date().toISOString()+file.originalname)
  }
})
var upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'productImg', maxCount: 1 }])


const router = express.Router();


router
  .route('/')
  .post(auth('manageProducts'),cpUpload, validate(ProductValidation.createProduct), ProductController.createProduct)
  .get(auth('getProducts'), validate(ProductValidation.getProducts), ProductController.getProducts);

router
  .route('/:productId')
  .put(auth('manageProducts'),cpUpload, validate(ProductValidation.updateProduct), ProductController.updateProduct)
  .get(auth('getProducts'), validate(ProductValidation.getProduct), ProductController.getProduct)
  .delete(auth('manageProducts'), validate(ProductValidation.deleteProduct), ProductController.deleteProduct);

// router.get('/product/:userName', validate(ProductValidation.empty), ProductController.getProductsByUserName)
// router.get('/product/detail/:productId', validate(ProductValidation.empty), ProductController.getProduct)

// router.post('/product/csv/upload', upload.single('file') , ProductController.uploadCsv)


module.exports = router;
