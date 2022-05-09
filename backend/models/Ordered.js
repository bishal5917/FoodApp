const mongoose = require('mongoose')

const OrderedSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    customerId: { type: String, required: true },
    productname: { type: String, required: true },
    sellerId: { type: String, required: true },
    qty: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    total: { type: Number, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "pending" },
    cancelled: { type: Boolean, default: false }

}, { timestamps: true }
);

module.exports = mongoose.model('Ordered', OrderedSchema) 
