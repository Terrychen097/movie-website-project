const { ExportCustomJobInstance } = require("twilio/lib/rest/bulkexports/v1/export/exportCustomJob");
const userModel = require("../models/User.js");

exports.getAdminDashboard = (req,res,next)=>{
    userModel.findOne({
        email :  req.body.email
    })
    .then(user=>{
            res.render("User/admin");
    })
    .catch(err => console.log(`Error : ${err}`));

}

exports.getUserDashboard = (req,res,next)=>{

    res.render("User/dashboard");

}


