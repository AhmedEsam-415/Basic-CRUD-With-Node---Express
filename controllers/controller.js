//@ import data
let courses = require('../data/courses');

//& express-validator is a set of express.js middlewares
const { validationResult } = require('express-validator');

const getAllCourses = (req, res) => {
  res.json(courses);
};

const getSingleCourse = (req, res) => {
  // هنا انا بخزن الid الي هيجي من الURL
  const ID = +req.params.courseID;

  // بقارن بين الID الي في الURL والي موجود و لو متساويين بظهره
  const course = courses.find((course) => course.id == ID);

  if (!course) {
    return res.status(404).json({ msg: 'course Not Found' });
  }

  res.json(course);
};

const creatNewCourse = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  const course = { id: courses.length + 1, ...req.body };
  courses.push(course);
  res.status(201).json(course);
};

const updateCourse = (req, res) => {
  const ID = +req.params.courseID;
  let course = courses.find((course) => course.id == ID);

  if (!course) {
    return res.status(404).json({ msg: 'course Not Found' });
  }

  course = { ...course, ...req.body };

  res.status(200).json(course);
};

const deleteCourse = (req, res) => {
  const ID = +req.params.courseID;
  courses = courses.filter((ele) => ele.id != ID);

  res.status(200).json(courses);
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  creatNewCourse,
  updateCourse,
  deleteCourse,
};
