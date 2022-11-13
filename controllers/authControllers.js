const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const User = require("../models/UserModel.js");
const Category = require("../models/CategoryModel");
const Course = require("../models/CourseModel");

const createUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect("/courses");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    asyncHandler(
      await User.findOne({ email }, (err, user) => {
        if (user) {
          bcrypt.compare(password, user.password, (err, same) => {
            if (same) {
              // USER SESSION
              req.session.userID = user._id;
              res.status(200).redirect("/users/dashboard");
            }
          });
        }
      }).clone((err) => {
        //USING CLONE BECAUSE Mongoose no longer allows executing the same query object twice.
        console.log(err);
      })
    );
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const userLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const getDashboardPage = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate("courses");
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
    courses,
  });
});

module.exports = {
  createUser,
  userLogin,
  userLogout,
  getDashboardPage,
};
