const Users = require('../Schema/user-model');
const httpStatusText = require('../utils/httpStatuseText');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const asyncWrapper = require('../utils/asyncWrapper');
const appError = require('../utils/appError');
const jwt = require('jsonwebtoken');

const getAllUsers = asyncWrapper(async (req, res, next) => {
  // Handle Pagination Data from Query
  const qyery = req.query;

  let limit = qyery.limit || 10;
  const page = qyery.page || 1;
  const skip = (page - 1) * limit;

  // Get All Courses from Database useing Course Model
  const allUsers = await Users.find({}, { __v: 0, password: 0, token: 0 })
    .limit(limit)
    .skip(skip);

  if (allUsers.length >= 1) {
    {
      res.json({ status: httpStatusText.SUCCESS, data: { Users: allUsers } });
    }
  } else {
    res.json({
      status: httpStatusText.SUCCESS,
      data: { Users: 'No Data' },
    });
  }
});

const getSingleUser = asyncWrapper(async (req, res, next) => {
  const user = await Users.findById(req.params.userID, {
    __v: 0,
    password: 0,
    token: 0,
  });

  if (!user) {
    return next(appError.create('user Not Found', 404, httpStatusText.FAIL));
  }

  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});

const deleteUser = asyncWrapper(async (req, res, next) => {
  const userID = await Users.findByIdAndDelete(req.params.userID);

  if (!userID) {
    return next(appError.create('user Not Found', 404, httpStatusText.FAIL));
  }

  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

const register = asyncWrapper(async (req, res, next) => {
  const existingUser = await Users.findOne(
    { email: req.body.email },
    { __v: 0, password: 0, token: 0 }
  );

  if (existingUser) {
    return next(
      appError.create('User Already Exists', 400, httpStatusText.FAIL)
    );
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;

  // Create a New User
  const newUser = new Users(req.body);

  // Save User to Database
  await newUser.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } });
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if Email and Password are provided
  if (!email || !password) {
    return next(
      appError.create(
        'Email and Password are required',
        400,
        httpStatusText.FAIL
      )
    );
  }

  const user = await Users.findOne({ email: email }, { __v: 0 });

  // Check if user exists
  if (!user) {
    return next(
      appError.create('Invalid Email or Password', 400, httpStatusText.FAIL)
    );
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return next(
      appError.create('Invalid Email or Password', 400, httpStatusText.FAIL)
    );
  }

  user.password = undefined;

  // Generate JWT token for the logged-in user
  const randomToken = process.env.JWT_SECRET_KEY;
  const token = await jwt.sign(
    { firstname: user.firstName, email: user.email, id: user._id },
    randomToken,
    { expiresIn: '1m' }
  );

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { user },
  });
});

module.exports = {
  getAllUsers,
  register,
  deleteUser,
  getSingleUser,
  login,
};
