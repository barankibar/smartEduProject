const express = require("express");

const pageController = require("../controllers/pageControllers");
const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/dashboard").get(pageController.getDashboardPage);
router.route("/register").get(pageController.getRegisterPage);
router.route("/login").get(pageController.getLoginPage);

module.exports = router;
