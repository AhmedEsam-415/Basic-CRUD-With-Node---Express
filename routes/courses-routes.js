const express = require('express');
const router = express.Router();

//& express-validator is a set of express.js Middlewares
const { body } = require('express-validator');

//* import controller
const coursesController = require('../controllers/coursesController');

//! get    => Get All Coursese & Single Course
//! post   => Create a New Course
//! patch  => Update a course
//! delete => Delete a course

//# Start APIs
router
  .route('/')

  .get(coursesController.getAllCourses)
  .post(
    [
      body('title')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Title at least is 2 digits'),

      body('price').notEmpty().withMessage('Require'),
    ],
    coursesController.creatNewCourse
  );

router
  .route('/:courseID')

  .get(coursesController.getSingleCourse)
  .patch(
    [
      body('title')
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage('Title at least is 2 digits'),

      body('price').notEmpty().withMessage('Require'),
    ],
    coursesController.updateCourse
  )
  .delete(coursesController.deleteCourse);
//# End APIs

module.exports = router;
