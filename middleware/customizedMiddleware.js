const userModel = require("../models/User.js");

exports.getUserDashboard = (req,res,next)=>{

    res.render("User/dashboard.handlebars");
}