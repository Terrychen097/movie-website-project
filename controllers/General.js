const express = require("express");
const router = express.Router();

const movieDB = require("../models/MovieDB.js");
const productModel = require("../models/Product.js");
//route of home page
router.get("/", (req, res) => {

    res.render("General/index", {
        feature: movieDB.getAllFeaturedProducts(),
        tvFeatured: movieDB.getAllFeaturedTv()
    })

});

//route of product list
router.get("/product", (req, res) => {

    res.render("General/product", {
        title: "Product Listing Page",
        products: movieDB.getAllProducts(),
        tvShow: movieDB.getAllTvShow()
    })

});


//route of products description
router.get("/productsDescription", (req, res) => {

    res.render("General/productsDescription", {
        productDes: movieDB.getAllProducts(),
        tvShow: movieDB.getAllTvShow()
    })
})

//route of product details
router.get("/products/:id", (req, res) => {

    res.render("General/productsDescription", {
        product: movieDB.getAProduct(req.params.id),

    })
})

//route from feature to description page
router.get("/productsDescription/:id",(req,res)=>{

    res.render("General/productsDescription",{
        product: movieDB.getAProduct(req.params.id),
    })

})

module.exports = router;