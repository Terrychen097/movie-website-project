const userModel = require("../models/User.js");
const bcrypt = require("bcryptjs");


exports.getLoginView = (req, res, next) => {

    res.render("User/login.handlebars");

};



exports.authenticate = (req, res, next) => {

    const name = req.body.name;
    const password = req.body.password;


    const errors = [];

    if (req.body.name === "") {
        errors.push("You must enter a user email");
    }

    if (req.body.password === "") {
        errors.push("You must enter a password");
    }

    if (errors.length > 0) {
        res.render("User/login.handlebars", {
            title: "login Page",
            errorMassages: errors
        });
    } else {
        userModel.findOne({
                email: req.body.email
            })
            .then(user => {
                if (user) {
                    console.log(`${user.password}`);
                    bcrypt.compare(req.body.password, user.password)
                        .then(hashVal => {
                            if (hashVal) {
                                req.session.user = user;

                                res.redirect(`/users/`);

                            } else {
                                errors.push("Your username and/or passwrod is incorrect");
                                res.render("User/login.handlebars", {
                                    title: "login Page",
                                    errorMassages: errors
                                });
                            }
                        })

                        .catch(err => console.log(`Error : ${err}`));
                } else {
                    errors.push("Your username and/or passwrod is incorrect");
                    res.render("User/login.handlebars", {
                        title: "login Page",
                        errorMassages: errors
                    });
                }

            })
            .catch(err => console.log(`Error : ${err}`));
    }

};