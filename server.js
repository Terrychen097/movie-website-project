const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

//imported module 
const movieDB = require("./models/MovieDB.js");

const app = express();

app.use(express.static("public"));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));

//route of home page
app.get("/", (req, res) => {

    res.render("index", {
        feature: movieDB.getAllFeaturedProducts(),
        tvFeatured: movieDB.getAllFeaturedTv()
    })

});

//route of product list
app.get("/product", (req, res) => {

    res.render("product", {
        title: "Product Listing Page",
        products: movieDB.getAllProducts(),
        tvShow: movieDB.getAllTvShow()
    })

});

//route of products description
app.get("/productsDescription", (req, res) => {

    res.render("productsDescription", {
        productDes: movieDB.getAllProducts(),
        tvShow: movieDB.getAllTvShow()
    })
})

//route of product details
app.get("/products/:id", (req, res) => {

    res.render("productsDescription", {
        product: movieDB.getAProduct(req.params.id),

    })
})

//route for regisration
app.get("/registration", (req, res) => {

    res.render("registration", {
        title: "registration page"
    })

});


app.post("/registration", (req, res) => {

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
        console.log(`${console.error.length}`)
        res.render("registration", {
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

// login
app.get("/login", (req, res) => {

    res.render("login", {
        title: "login page"
    })
});



const PORT = 3000;
app.listen(PORT, () => {

    console.log(`Web Server is up and running on PORT ${PORT}`);
});