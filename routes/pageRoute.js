const express = require("express");

const pageController = require("../controllers/pageControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/contact").get(pageController.getContactPage);
router.route("/register").get(authMiddleware.checkLoginRegisterAuth, pageController.getRegisterPage);
router.route("/login").get(authMiddleware.checkLoginRegisterAuth, pageController.getLoginPage);

module.exports = router;
