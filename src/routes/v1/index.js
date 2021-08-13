const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const productRoute = require('./product.route');
const fileUpload = require('./fileUpload.route');
const restaurantRoute = require('./restaurant.route');
const qrRoute = require('./qr.route');
const categoryRoute = require('./category.route');
const cmsRoute = require('./cms.route');
const enquiryRoute = require('./enquiry.route');
const orderRoute = require('./order.route');
const commonRoute = require('./common.route');



const router = express.Router();

router.use('/auth', authRoute);
router.use(['/user', '/users'], userRoute);
router.use(['/product', '/products'], productRoute);
router.use(['/file', '/files'], fileUpload);
router.use(['/restaurant', '/restaurants'], restaurantRoute);
router.use(['/qr'], qrRoute);
router.use(['/category'], categoryRoute);
router.use(['/cms'], cmsRoute);
router.use(['/enquiry'], enquiryRoute);
router.use(['/order'], orderRoute);
router.use(['/common'], commonRoute);






module.exports = router;
