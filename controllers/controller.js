//@ import data
let Course = require('../Schema/course-model');

//& express-validator is a set of express.js middlewares
const { validationResult } = require('express-validator');

const getAllCourses = async (req, res) => {
  // Get All Courses from Database useing Course Model
  const allCourses = await Course.find();

  res.json(allCourses);
};

const creatNewCourse = async (req, res) => {
  // Hadle Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const newCourse = new Course(req.body);
  await newCourse.save();

  res.status(201).json(newCourse);
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseID);

    if (!course) {
      return res.status(404).json({ msg: 'course Not Found' });
    }

    res.json(course);
  } catch (err) {
    return res.status(500).json({ error: 'ID Not Defiend' });
  }
};

const updateCourse = async (req, res) => {
  let course = await Course.findById(req.params.courseID);

  if (!course) {
    return res.status(404).json({ msg: 'course Not Found' });
  }

  // Update Course Data with [ Object.assign( Course Name getenBy ID, value => req.body ) ] Method
  course = Object.assign(course, req.body);
  await course.save();

  res.status(200).json(course);
};

const deleteCourse = async (req, res) => {
  try {
    let course = await Course.findByIdAndDelete(req.params.courseID);

    if (!course) {
      return res.status(404).json({ msg: 'course Not Found' });
    }

    res
      .status(200)
      .json({ msg: `${course.title} course Deleted Successfully` });
    // ======= //
  } catch (err) {
    return res.status(500).json({ error: 'ID Not Defiend' });
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  creatNewCourse,
  updateCourse,
  deleteCourse,
};
