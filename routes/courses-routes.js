const express = require('express');
const router = express.Router();

//& express-validator is a set of express.js Middlewares
const { body } = require('express-validator');

//* import controller
const coursesController = require('../controllers/controller');

//# Start APIs
router
  .route('/')

  //! Get All Coursese
  .get(coursesController.getAllCourses)

  //! Create a New Course
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

  //! Get Single Course
  .get(coursesController.getSingleCourse)

  //! Update a course
  .patch(coursesController.updateCourse)

  //! Delete a course
  .delete(coursesController.deleteCourse);
//# End APIs

module.exports = router;
