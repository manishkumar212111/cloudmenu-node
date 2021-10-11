const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const paymentService = require('../services/payment.service');
const Order = require('../models/order.model');
require("dotenv").config();

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
        console.log(resu)
        if(resu.id && resu?.result?.code == '000.100.110'){
            let order= await Order.findOneAndUpdate({ checkoutId: req.body.id} , { active: 1 , paymentStatus: "success"})
            res.send({payment: resu, order: order})
        } else {
            res.send({error: true , message: resu?.result?.description})

        }
    })
});

module.exports = {
  create,
  capturePayment
};
