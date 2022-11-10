const asyncHandler = require("express-async-handler");

const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");

const createCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const getAllCourses = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.query.categories });

    let filter = {};

    if (req.query.categories) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter);
    const categories = await Category.find({});

    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const getCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });

    res.status(200).render("course", {
      course,
      page_name: "courses",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
};
