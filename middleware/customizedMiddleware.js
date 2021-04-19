const { ExportCustomJobInstance } = require("twilio/lib/rest/bulkexports/v1/export/exportCustomJob");
const userModel = require("../models/User.js");

exports.getAdminDashboard = (req,res,next)=>{

    res.render("User/admin");
}

exports.getUserDashboard = (req,res,next)=>{

    res.render("User/dashboard");

}


