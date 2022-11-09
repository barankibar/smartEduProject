const express = require("express");

const courseController = require("../controllers/courseController.js");

const router = express.Router();

router.route("/").post(courseController.createCourse); //https://../courses

module.exports = router;
