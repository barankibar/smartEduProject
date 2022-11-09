const asyncHandler = require("express-async-handler");

const Course = require("../models/CourseModel");

const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (err){
    res.status(400).json({
      status: "fail",
      err
    });
  }
}

module.exports = {createCourse};
