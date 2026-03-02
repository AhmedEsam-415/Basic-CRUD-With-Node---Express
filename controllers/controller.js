//@ import data
let Course = require('../Schema/course-model');

//& express-validator is a set of express.js middlewares
const { validationResult } = require('express-validator');

const httpStatusText = require('../utils/httpStatuseText');

const getAllCourses = async (req, res) => {
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
};

const creatNewCourse = async (req, res) => {
  // Hadle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: { errors: errors.array() } });
  }

  // Create a New Course
  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newCourse } });
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseID, { __v: 0 });

    if (!course) {
      return res.status(404).json({
        status: httpStatusText.FAIL,
        data: { error: 'course Not Found' },
      });
    }

    res.json({ status: httpStatusText.SUCCESS, data: { course } });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      data: { error: err.message },
    });
  }
};

const updateCourse = async (req, res) => {
  let course = await Course.findById(req.params.courseID);

  // Hadle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, data: { errors: errors.array() } });
  }

  // Update Course Data
  course = Object.assign(course, req.body);
  await course.save();

  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
};

const deleteCourse = async (req, res) => {
  try {
    let course = await Course.findByIdAndDelete(req.params.courseID);

    if (!course) {
      return res
        .status(404)
        .json({ status: httpStatusText.FAIL, msg: 'course Not Found' });
    }

    res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
    // ======= //
  } catch (err) {
    return res
      .status(500)
      .json({ status: httpStatusText.ERROR, data: { error: err.message } });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  creatNewCourse,
  updateCourse,
  deleteCourse,
};
