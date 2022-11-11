const User = require("../models/UserModel");

const checkDashboardAuth = (req, res, next) => {
  User.findById(req.session.userID, (err, user) => {
    if (err || !user) return res.redirect("/login");
  });
  next();
};

const checkLoginRegisterAuth = (req, res, next) => {
    if(req.session.userID) return res.redirect("/users/dashboard");
    next();
};

module.exports = {
  checkLoginRegisterAuth,
  checkDashboardAuth,
};
