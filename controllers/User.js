const express = require("express");
const router = express.Router();
const userModel = require("../models/User.js");
const { route } = require("./General.js");

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

    const newUser = {
        email : req.body.email,
        phoneNu : req.body.phoneNu,
        name : req.body.name,
        password : req.body.password,
        desc : req.body.desc
    }

    const user = new userModel(newUser);
    user.save()
      .then(user=>{

       res.redirect("/users")

      })
      .catch(err=>console.log(`Error : ${err}`));

})



router.get("/",(req,res)=>{

    userModel.find()
    .then(users=>{
      const filteredUsers = users.map(user=>{
        return{
            id : user._id,
            name : user.name,
            email : user.email
        }
      });

      res.render("User/list.handlebars",{
          filteredUsers         
      })
        
    })
    .catch(err=>console.log(`Error : ${err}`));

})

router.get("/:id",(req,res)=>{

    userModel.findById(req.params.id)

    .then(user=>{

        const {id, name, email,phoneNu} = user;

        const filteredUser = {
                id,
                name,
                email,
                phoneNu
        }

        res.render("User/update.handlebars",{
            filteredUser
        })
        
    })
    .catch(err=>console.log(`Error : ${err}`));
})

//update
router.put("/:id",(req,res)=>{

    const newUser = {
        email : req.body.email,
        phoneNu : req.body.phoneNu,
        name : req.body.name,
        password : req.body.password,
    }

    userModel.updateOne({_id: req.params.id},newUser)
    .then(()=>{
        res.redirect("/users")
    })
    .catch(err=>console.log(`Error : ${err}`));
})


//delete data
router.delete("/:id",(req,res)=>{

    userModel.deleteOne({_id: req.params.id})
    .then(()=>{
        res.redirect("/users")
    })
    .catch(err=>console.log(`Error : ${err}`));
})







module.exports = router;