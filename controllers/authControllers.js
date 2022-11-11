const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const User = require("../models/UserModel.js");

const createUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      status: "success",
      user,
    });
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
              res.status(200).redirect("/");
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

module.exports = {
  createUser,
  userLogin,
};
