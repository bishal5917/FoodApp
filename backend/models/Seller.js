const mongoose = require('mongoose')

const SellerSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    opensAt: {
        type: String,
        required: true
    },
    closesAt: {
        type: String,
        required: true
    },
    notifications: {
        type: Array,
        default: []
    },
}, { timestamps: true }
);

module.exports = mongoose.model('Seller', SellerSchema) 
