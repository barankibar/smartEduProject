const express = require("express");

const authController = require("../controllers/authControllers");

const router = express.Router();

router.route("/register").post(authController.createUser);

module.exports = router;