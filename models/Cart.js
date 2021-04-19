const mongoose = require("mongoose");
const { Schema } = mongoose;



const cartSchema = new Schema({

    name:
    {
        type:String,
        required:true
    },
    sPic:
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
    } 
});


const CartModel = mongoose.model('Cart',cartSchema);
module.exports = CartModel;