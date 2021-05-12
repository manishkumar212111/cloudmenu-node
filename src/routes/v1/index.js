const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const fileUpload = require('./fileUpload.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use(['/user', '/users'], userRoute);
router.use(['/product', '/users'], productRoute);
router.use(['/file', '/files'], fileUpload);



module.exports = router;
