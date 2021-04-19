const express = require("express");
const router = express.Router();
const productModel = require("../models/Product.js");
const path = require("path");
const httpProcess = require("../middleware/httpProcess");
const manageProduct = require("../middleware/manageProduct");
const cartModel = require("../models/Cart.js");


router.get("/addCart", (req, res) => {
    console.log(`1${req.params.id}`)
    res.render("Product/addCart");

})

router.get("/addCart/:id", (req, res) => {
    productModel.findById(req.params.id)
    .then((product)=>{
    const {id, name, sPic, lPic , desc, category, rating, price, rent, type}  = product;

        const cartFilter = {
            id, name, sPic, lPic , desc, category, rating, price, rent, type
        }
//add cart
        const cart = new cartModel(cartFilter);
        cart.save()
        .then(cart=>{
            console.log(`1${cart.name}`)

            cartModel.find()
            .then(carts=>{
                console.log(`2${carts.name}`)
                const cartFilters = carts.map(cart=>{
                    console.log(`3${cart.price}`)
                    return{
                        name : cart.name,
                        id : cart._id,
                        price : cart.price,
                        sPic : cart.sPic,
                        rent : cart.rent
                    }
                  });
                
            res.render("Product/addCart", {
                cartFilters
            })

            })
            .catch(err=>console.log(`Error : ${err}`));

        })
        .catch(err=>console.log(`Error : ${err}`));
    })
    .catch(err=>console.log(`Error : ${err}`));
})


router.get("/listProduct/",(req,res)=>{
    productModel.find()
    .then(products=>{

      const filteredProduct = products.map(product=>{
        return{
            id : product._id,
            title : product.name,
            sPic : product.sPic,
            picName : product.sPic.name
        }
      });
      res.render("Product/listProduct",{
        filteredProduct         
      })
        
    })
    .catch(err=>console.log(`Error : ${err}`));
})

router.get("/addProduct", (req, res) => {

    res.render("Product/addProduct");

})


router.get("/productDetail/:id", (req, res) => {

    productModel.findById(req.params.id)
    .then((product)=>{
    const {id, name, sPic, lPic , desc, category, rating, price, rent, type}  = product;

        const picFilter = {
            id, name, sPic, lPic , desc, category, rating, price, rent, type
        }

        res.render("Product/productDetail", {
            picFilter
        })

    })
    .catch(err=>console.log(`Error : ${err}`));


})



router.post("/addProduct", (req, res) => {

    const errors = [];

    if (req.body.name == "") {
        errors.push("You must enter a Title");
    }

    if (req.body.des == "") {
        errors.push("You must enter a description");
    }

    if (req.body.rating == "") {
        errors.push("You must enter a rating");
    }

    if (req.body.category == "") {
        errors.push("You must enter a category");
    }

    if (req.body.price == "") {
        errors.push("You must enter a price");
    }
    if (req.body.rent == "") {
        errors.push("You must enter a rent");
    }
    if (req.body.type == "") {
        errors.push("You must enter a type");
    }  
    if (req.files == null){
        errors.push("You must have a img");
    }
    if (req.files.sPic.mimetype == "image/jpeg" || req.files.sPic.mimetype == "image/git" || req.files.sPic.mimetype == "image/png" ){}
    else
    {
        errors.push("You must upload a jpg/git/png");
    }
    if (errors.length > 0) {
        res.render("Product/addProduct", {
             errorMassages: errors
        });
    }
    else{

       

    const newProduct = {
        name : req.body.name,
        desc : req.body.desc,
        category : req.body.category,
        rating : req.body.rating,
        price : req.body.price,
        rent : req.body.rent,
        type : req.body.type,
        sPic : req.files.sPic.name,
        lPic : req.files.lPic.name
    }

    const product = new productModel(newProduct);
    product.save()
      .then((product)=>{
        
        req.files.sPic.name = `pro_pic_1${product.id}${path.parse(req.files.sPic.name).ext}`
        req.files.lPic.name = `pro_pic_2${product.id}${path.parse(req.files.lPic.name).ext}`
        req.files.sPic.mv(`public/uploads/${req.files.sPic.name}`)
        
        .then(()=>{
            productModel.updateMany({_id: product._id},{
                sPic :  req.files.sPic.name,
                lPic :  req.files.lPic.name
            })
            .then(()=>{
                req.files.lPic.mv(`public/uploads/${req.files.lPic.name}`)
                .then(()=>{                               
                res.redirect("/products/")
                })                
                .catch(err=>console.log(`Error : ${err}`));
            })
            .catch(err=>console.log(`Error : ${err}`));
        })
        .catch(err=>console.log(`Error : ${err}`));
      })
      .catch(err=>console.log(`Error111 : ${err}`)); 

    }

})

//list products
router.get("/",(req,res)=>{

    productModel.find()
    .then(products=>{
        const filteredProduct = products.map(product=>{
        //if(product.type ==="movie"){
        return{
            id : product._id,
            title : product.name,
            sPic : product.sPic,
            picName : product.sPic.name,
            type : product.type
        }
//}
      });

      res.render("Product/productDashboard",{
        filteredProduct         
      })
        
    })
    .catch(err=>console.log(`Error : ${err}`));

})

//edit Product
router.get("/:id",(req,res)=>{

    productModel.findById(req.params.id)
    .then((product)=>{
    const {id, name, sPic, lPic , desc, category, rating, price, rent, type}  = product;

        const picFilter = {
            id, name, sPic, lPic , desc, category, rating, price, rent, type
        }

        res.render("Product/editProduct", {
            picFilter
        })

    })
    .catch(err=>console.log(`Error : ${err}`));

})


//update
router.put("/:id",(req,res)=>{
    const errors = [];

    if (req.body.name == "") {
        errors.push("You must enter a Title");
    }

    if (req.body.des == "") {
        errors.push("You must enter a description");
    }

    if (req.body.rating == "") {
        errors.push("You must enter a rating");
    }

    if (req.body.category == "") {
        errors.push("You must enter a category");
    }

    if (req.body.price == "") {
        errors.push("You must enter a price");
    }
    if (req.body.rent == "") {
        errors.push("You must enter a rent");
    }
    if (req.body.type == "") {
        errors.push("You must enter a type");
    }  
    if (req.files == null){
        errors.push("You must have a img");
    }
    if (req.files.sPic.mimetype == "image/jpeg" || req.files.sPic.mimetype == "image/git" || req.files.sPic.mimetype == "image/png" ){}
    else
    {
        errors.push("You must upload a jpg/git/png");
    }
    if (errors.length > 0) {
        res.render("Product/editProduct", {
             errorMassages: errors
        });
    }else{
        req.files.sPic.name = `pro_pic_${req.params.id}${path.parse(req.files.sPic.name).ext}`
        req.files.lPic.name = `pro_pic_${req.params.id}${path.parse(req.files.lPic.name).ext}`
    const newProduct = {
        name : req.body.name,
        desc : req.body.desc,
        category : req.body.category,
        rating : req.body.rating,
        price : req.body.price,
        rent : req.body.rent,
        type : req.body.type,
        sPic : req.files.sPic.name,
        lPic : req.files.lPic.name
    }


    req.files.sPic.mv(`public/uploads/${req.files.sPic.name}`)
    .then(()=>{
        productModel.updateMany({_id: newProduct._id},{
            sPic :  req.files.sPic.name,
            lPic :  req.files.lPic.name
        })
        //upload picture
        .then(()=>{

            req.files.lPic.mv(`public/uploads/${req.files.lPic.name}`)
            .then(()=>{       
                
                

                productModel.updateOne({_id: req.params.id},newProduct)
                .then(user=>{

                         res.redirect("/products/listProduct");
                })
                .catch(err=>console.log(`Error : ${err}`));

            })                
            .catch(err=>console.log(`Error : ${err}`));
        })
        .catch(err=>console.log(`Error : ${err}`));
    })
    .catch(err=>console.log(`Error : ${err}`));




}

})

//delete data
router.delete("/:id",(req,res)=>{

    productModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/products/listProduct")
    })
    .catch(err=>console.log(`Error : ${err}`));
})


module.exports = router;