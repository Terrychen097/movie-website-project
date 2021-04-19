const mongoose = require("mongoose");
const { Schema } = mongoose;

const productScheme = new Schema({

    name:
    {
        type:String,
        required:true
    },
    desc:
    {
        type:String,
        required:true
    },
    category:
    {
        type:String,
        required:true
    },
    rating:
    {
        type:Number,
        required:true
    },
    sPic:
    {
        type:String,
        required:true
    },
    lPic:
    {
        type:String,
        required:true
    },
    price:
    {
        type:String,
        required:true
    },
    rent:
    {
        type:String,
        required:true
    },
    type:
    {
        type:String,
        required:true
    },
    featured:
    {
        type:String,
        default: false
    }

});


const ProductModel = mongoose.model('Product',productScheme);
module.exports = ProductModel;