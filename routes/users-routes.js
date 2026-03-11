const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');

// Get All User
// Register
// Login

//# Start APIs
router.route('/').get(usersController.getAllUsers);

router
  .route('/:userID')
  .get(usersController.getSingleUser)
  .delete(usersController.deleteUser);

router.route('/register').post(usersController.register);

router.route('/login').post(usersController.login);

//# End APIs

module.exports = router;
