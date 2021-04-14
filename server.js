const express = require("express");
const exphbs  = require('express-handlebars');
require('dotenv').config({ path: 'config/keys.env' });
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

//imported module 

const generalController = require("./controllers/General.js");
const userController = require("./controllers/User.js");

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));

app.use("/",generalController);

app.use("/users/",userController);




const PORT =process.env.PORT;
app.listen(process.env.PORT, () => {

    console.log(`Web Server is up and running on PORT ${PORT}`);
    mongoose.connect(process.env.MONGO_DB_URL_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log(`Connected to MongoDB`)

    })
    .catch((err=>console.log(`Error: ${err}`)));
});