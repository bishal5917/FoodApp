const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    sellerId:{type:String,required:true},
    image: {
        type: String,
        default:""
    },
    name:{type:String,required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,default:""},
}, { timestamps: true }
);

module.exports=mongoose.model('Product',ProductSchema) 
