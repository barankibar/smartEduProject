const asyncHandler = require("express-async-handler");

const Course = require("../models/CourseModel");
const Category = require("../models/CategoryModel");
const User = require("../models/UserModel");

const createCourse = asyncHandler(async (req, res) => {
  try {
    await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });

    res.status(201).redirect("/courses");
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
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      "user"
    );

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

const enrollCourses = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.userID });
    if (!user.courses.includes(req.body.course_id)) {
      await user.courses.push({ _id: req.body.course_id });
      await user.save();

      res.status(201).redirect("/users/dashboard");
    } else {
      res.redirect(req.get("referer"));
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const releaseCourse = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    if (!user.courses.includes(req.body.course_id)) {
      res.status(400).redirect("/users/dashboard");
    }
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(202).redirect("/users/dashboard");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findById({ _id: req.body.course_id });
    if(!course) {
      res.status(400).redirect("referer");
    }
    await course.delete();
    
    res.status(202).redirect("/users/dashboard");
  } catch (err) {
    res.send(400).json({
      status: "fail",
      err,
    });
  }
});

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  enrollCourses,
  releaseCourse,
  deleteCourse,
};
