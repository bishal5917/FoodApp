const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    address: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true
    },
    notifics: {
        type: Array,
        default: []
    },
}, { timestamps: true }  //timestamps will  be given on creation and updation automatically
);

module.exports = mongoose.model('User', UserSchema)
//model name is user