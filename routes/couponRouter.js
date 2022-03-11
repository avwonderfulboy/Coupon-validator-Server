const express = require('express');
const Coupon = require('../models/couponSchema');



const router = express.Router();

// create coupon api: @POST , body:  couponType, minAmt,startDate,endDate
router.post('/coupon', async (req, res) => {
    try {
        const { couponName, couponType, minAmt, startDate, endDate, discount, maxDiscount } = req.body;
        if (!couponName || !couponType || !minAmt || !discount || !startDate || !endDate)
            return res.status(400).json({ msg: "Please check your data" });

        const isCouponExists = await Coupon.findOne({ couponName });
        if (isCouponExists)
            return res.status(400).json({ msg: "Coupon already exists" });


        const newCoupon = new Coupon({ couponName, couponType, minAmt, discount, maxDiscount, startDate, endDate });
        await newCoupon.save();
        res.send("Coupon created successfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }

});

router.get('/coupon', async (req, res) => {
    try {

        const coupons = await Coupon.find();
        res.json(coupons);
    }
    catch (err) {
        console.log('Error in getting from database');
    }
})

router.post('/applyCoupon', async (req, res) => {
    try {
        const { couponName, cartAmount } = req.body;
        console.log(req.body);
        const coupon = await Coupon.findOne({ couponName });
        // // validate couponName and startEnd, endDate
        if (!coupon)
            return res.status(400).json({ msg: "Invalid Coupon" });

        console.log(Date.now() > coupon.startDate.getTime())

        if (Date.now() < coupon.startDate.getTime() || Date.now() > coupon.endDate.getTime())
            return res.status(400).json({ msg: "coupon expired" });

        if (cartAmount < coupon.minAmt)
            return res.status(400).json({ msg: `Your cart amount cannot fullfil our requirement so increase the cart amount by ${coupon.minAmt - cartAmount}` })

        // return discount price
        let discountedPrice = 0;
        if (coupon.couponType.toLowerCase() === 'flat')
            discountedPrice = cartAmount - coupon.discount;
        else {
            let discount = (cartAmount * coupon.discount) / 100;
            if (discount > coupon.maxDiscount)
                discountedPrice = cartAmount - coupon.maxDiscount;
            else
                discountedPrice = cartAmount - discount;
        }

        res.send({ discountedPrice });
    }
    catch (err) {
        console.log("Internal Server Error");
    }
})

module.exports = router;