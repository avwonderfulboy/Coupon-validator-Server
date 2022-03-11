const mongoose = require('mongoose');
//minAmt coupon type startDate endDate
const couponSchema = new mongoose.Schema({
    couponName: {
        type: String,
        required: true,
        unique: true
    },
    minAmt: {
        type: Number,
        required: true
    },
    couponType: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    maxDiscount: {
        type: Number,
    }

}, { timestamps: true })

const Coupon = mongoose.model('coupon', couponSchema);
module.exports = Coupon;
