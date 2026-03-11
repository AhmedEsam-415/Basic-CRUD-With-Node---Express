//@ import data From DB
let Course = require('../Schema/course-model');

//& express-validator is a set of express.js middlewares
const { validationResult } = require('express-validator');

const httpStatusText = require('../utils/httpStatuseText');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/appError');

const getAllCourses = asyncWrapper(async (req, res) => {
  // Handle Pagination Data from Query
  const qyery = req.query;

  let limit = qyery.limit || 10;
  const page = qyery.page || 1;
  const skip = (page - 1) * limit;

  // Get All Courses from Database useing Course Model
  const courses = await Course.find({}, { __v: 0 }).limit(limit).skip(skip);

  if (courses.length >= 1) {
    {
      res.json({ status: httpStatusText.SUCCESS, data: { courses } });
    }
  } else {
    res.json({
      status: httpStatusText.SUCCESS,
      data: { courses: 'No Data' },
    });
  }
});

const creatNewCourse = asyncWrapper(async (req, res, next) => {
  // Hadle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(AppError.create('Invalid Data', 400, httpStatusText.FAIL));
  }

  // Create a New Course
  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newCourse } });
});

const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.courseID, { __v: 0 });

  if (!course) {
    return next(AppError.create('course Not Found', 404, httpStatusText.FAIL));
  }

  res.json({ status: httpStatusText.SUCCESS, data: { course } });
});

const updateCourse = asyncWrapper(async (req, res, next) => {
  let course = await Course.findById(req.params.courseID);

  // Hadle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(AppError.create('Invalid Data', 400, httpStatusText.FAIL));
  }

  // Update Course Data
  course = Object.assign(course, req.body);
  await course.save();

  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});

const deleteCourse = asyncWrapper(async (req, res, next) => {
  let course = await Course.findByIdAndDelete(req.params.courseID);

  if (!course) {
    return next(AppError.create('course Not Found', 404, httpStatusText.FAIL));
  }

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAllCourses,
  getSingleCourse,
  creatNewCourse,
  updateCourse,
  deleteCourse,
};
