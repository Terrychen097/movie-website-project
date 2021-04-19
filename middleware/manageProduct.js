const productModel = require("../models/Product.js");
const express = require("express");
const router = express.Router();

exports.listProduct = (req,res,next)=>{
    productModel.find()
    .then(product=>{
      const filteredProduct = product.map(product=>{
        return{
            id : product._id,
            title : product.name,
            sPic : product.sPic,
            picName : product.sPic.name
        }
      });
console.log("ps")
      res.render("/products/",{
        filteredProduct         
      })
        
    })
    .catch(err=>console.log(`Error : ${err}`));
}









