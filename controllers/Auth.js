const express = require("express");
const router = express.Router();
const AuthServers = require("../middleware/AuthService.js");


router.get("/login", AuthServers.getLoginView);

router.post("/login",AuthServers.authenticate);
// login
// router.get("/login", (req, res) => {

//     res.render("User/login.handlebars", {
//         title: "login page"
//     })
// });

// router.post("/login",(req,res) =>{
//     const errors = [];

//     if (req.body.userName == "") {
//         errors.push("You must enter a user email");
//     }

//     if (req.body.password == "") {
//         errors.push("You must enter a password");
//     }

//     if (errors.length > 0) {
//         res.render("User/login.handlebars", {
//             title: "login Page",
//             errorMassages: errors
//         });
//     }else{
//         req.redirect("/");
//     }
// });


module.exports = router;