const express = require("express");
const router = express.Router();
const AuthServers = require("../middleware/AuthService.js");


router.get("/login", AuthServers.getLoginView);

router.post("/login",AuthServers.authenticate);



module.exports = router;