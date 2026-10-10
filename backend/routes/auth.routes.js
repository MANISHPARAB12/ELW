
const express = require("express");
const router = express.Router();

const controllers = require("../controller/users.controller");

console.log("login:", typeof controllers.login);
console.log("signup:", typeof controllers.signup);

router.post("/login", controllers.login);
router.post("/register", controllers.signup);

module.exports = router;
