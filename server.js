const express = require("express");
const exphbs  = require('express-handlebars');
require('dotenv').config({ path: 'config/keys.env' });
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
const fileUpload = require('express-fileupload');


//import middleware
const generalController = require("./controllers/General.js");
const userController = require("./controllers/User.js");
const httpProcessing = require("./middleware/httpProcess.js");
const authController = require("./controllers/Auth.js");
const productController = require("./controllers/Product.js");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(fileUpload());

app.use(session({
    secret: "TerryChen",
    resave: false,
    saveUninitialized: true
  }))

app.use((req,res,next)=>{


    res.locals.user = req.session.user;

    next();
})



app.use(httpProcessing);
app.use("/",generalController);
app.use("/users/",userController);
app.use("/products/",productController);
app.use("/auth/",authController);



const PORT =process.env.PORT;
app.listen(process.env.PORT, () => {

    console.log(`Web Server is up and running on PORT ${PORT}`);
    mongoose.connect("mongodb+srv://terrychen:terrychen123@cluster0.riujx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`Connected to MongoDB`)

    })
    .catch((err=>console.log(`Error: ${err}`)));
});