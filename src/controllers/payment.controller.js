const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const Order = require('../models/order.model');
const { Restaurant } = require('../models');
require("dotenv").config();

const webpush = require('web-push')
webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

const create = catchAsync(async (req, res) => {
    await paymentService.createPayment(req.body , async (resu) => {

        if(resu.id){
            let count = await Order.find({ restaurant : req.body.restaurant});

            let order = new Order({...req.body , orderNo: count.length +1 , checkoutId : resu.id , active : 0, paymentStatus: "Pending" })
            await order.save();
            res.send({...resu, order : order})
        
        } else {
            res.send({...resu})
        }

    })
});

const capturePayment = catchAsync(async (req, res) => {
    // res.send({...req.body, ...req.query})
    console.log(req.query , req.body)
    await paymentService.verifyPayment(req.query.id , async (resu) => {
        console.log(req.body.id)
        if(resu.id && resu?.result?.code == '000.100.110'){
            let order= await Order.findOneAndUpdate({ checkoutId: req.query.id} , { active: 1 , paymentStatus: "success"}, {returnNewDocument : true})
            let userData = await Restaurant.findById(order.restaurant).populate("user");
            console.log(userData);
            console.log(order);
            // send user push notification
            // if(userData && userData?.user?.subscriptionData){
            //     const payload = JSON.stringify({
            //     title: 'New Order',
            //     body: 'You have new order with id '+ order.orderNo,
            //     })
            
            //     await webpush.sendNotification(JSON.parse(userData?.user?.subscriptionData), payload)
            
            // }
            res.redirect(`${process.env.APP_URL}cart?type=success&orderId=${order.orderNo}`)
            // res.send({payment: resu, order: order})
        } else {
            res.redirect(`${process.env.APP_URL}cart?type=failed&message=${resu?.result?.description || "Unable to complete payment"}`)

            // res.send({error: true , message: resu?.result?.description})

        }
    })
});

module.exports = {
  create,
  capturePayment
};
