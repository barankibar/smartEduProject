const express = require("express");

const courseController = require("../controllers/courseController.js");

const router = express.Router();

// FOR https://../courses

router.route("/").post(courseController.createCourse); 
router.route("/").get(courseController.getAllCourses); 
router.route("/:slug").get(courseController.getCourse);

module.exports = router;
