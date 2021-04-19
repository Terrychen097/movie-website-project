const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");


exports.logout = (req,res,next)=>{

    req.session.destroy();
    res.redirect("/users");
}

exports.getLoginView = (req, res, next) => {

    res.render("User/login");

};



exports.authenticate = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;


    const errors = [];

    if (req.body.email === "") {
        errors.push("You must enter a user email");
    }

    if (req.body.password === "") {
        errors.push("You must enter a password");
    }

    if (errors.length > 0) {
        res.render("User/login", {
            title: "login Page",
            errorMassages: errors
        });
    } else {
        userModel.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    bcrypt.compare(req.body.password, user.password)
                        .then(hashVal => {
                            if (hashVal) {
                                req.session.user = user;
                                if(user.Admin === "true"){
                                    res.redirect("/users/admin");
                                }
                                else{
                                     res.redirect(`/users/dashboard`);
                                }
                               
                            } else {
                                errors.push("Your username and/or password is incorrect");
                                res.render("User/login", {
                                    title: "login Page",
                                    errorMassages: errors
                                });
                            }
                        })

                        .catch(err => console.log(`Error : ${err}`));
                } else {
                    errors.push("Your username and/or password is incorrect");
                    res.render("User/login", {
                        title: "login Page",
                        errorMassages: errors
                    });
                }

            })
            .catch(err => console.log(`Error : ${err}`));
    }

};