const express = require("express");
const router = express.Router();
const userModel = require("../models/User.js");

//route for regisration
router.get("/register", (req, res) => {

    res.render("User/registration.handlebars", {
        title: "registration page"
    })

});


router.post("/register", (req, res) => {

    const errors = [];

    if (req.body.email == "") {
        errors.push("You must enter a user email");
    }

    if (req.body.password == "") {
        errors.push("You must enter a password");
    }

    if (req.body.address == "") {
        errors.push("You must enter a address");
    }

    if (req.body.phoneNu == "") {
        errors.push("You must enter a phone-number");
    }

    if (errors.length > 0) {
        res.render("User/registration.handlebars", {
            title: "registration Page",
            errorMassages: errors
        });
    } else {
        const accountSid = 'ACda2f85c39b1d07cb4be1699802acac5c';
        const authToken = '020af0e9c7bf69e81ff18aff4740ba99';
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: `${req.body.message}`,
                from: '+14342265537',
                to: `${req.body.phoneNu}`
            })
            .then(message => console.log(message.sid));
        res.redirect("/");
    }


})

router.post("/register",(req,res)=>{

    console.log(req.body) 

    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        username: req.body.username,
        password : req.body.password
    }

    const user = new userModel(newUser);
    user.save()
      .then(user=>{

        console.log(user);

      })
      .catch(err=>console.log(`Error : ${err}`))


})


// login
router.get("/login", (req, res) => {

    res.render("User/login", {
        title: "login page"
    })
});

router.post("/login",(req,res) =>{
    const errors = [];

    if (req.body.userName == "") {
        errors.push("You must enter a user email");
    }

    if (req.body.password == "") {
        errors.push("You must enter a password");
    }

    if (errors.length > 0) {
        res.render("User/login.handlebars", {
            title: "login Page",
            errorMassages: errors
        });
    }else{
        req.redirect("/");
    }
});


module.exports = router;