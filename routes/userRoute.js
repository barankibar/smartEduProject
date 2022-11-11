const express = require("express");

const authController = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(authController.createUser);
router.route("/login").post(authController.userLogin);
router.route("/logout").get(authController.userLogout);
router.route("/dashboard").get(authMiddleware.checkDashboardAuth, authController.getDashboardPage);

module.exports = router;
