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
const modifierRoute = require('./modifier.route');
const menuRoute = require('./menu.route');
const notificationRoute = require('./notification.route');
const paymentRoute = require('./payment.route');



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
router.use(['/modifiers', '/modifier'], modifierRoute);
router.use(['/menu', '/menus'], menuRoute);
router.use(['/notification'], notificationRoute);
router.use(['/payment'], paymentRoute);






module.exports = router;
