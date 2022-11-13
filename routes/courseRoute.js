const express = require("express");

const courseController = require("../controllers/courseController.js");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

// FOR https://../courses

router.route("/").post(roleMiddleware.roleChecker(["Teacher", "Admin"]), courseController.createCourse); 
router.route("/").get(courseController.getAllCourses); 
router.route("/:slug").get(courseController.getCourse);
router.route("/enroll").post(courseController.enrollCourses);
router.route("/release").post(courseController.releaseCourse);
router.route("/:slug/delete").post(courseController.deleteCourse);

module.exports = router;
