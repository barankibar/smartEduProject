const asyncHandler = require("express-async-handler");

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

module.exports = {createUser};