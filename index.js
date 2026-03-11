//& Basic CRUD Application => [ Create, Read, Update, Delete ]
// ================================================================ //

//! Start Application
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const httpStatusText = require('./utils/httpStatuseText');

const coursesRouter = require('./routes/courses-routes');
const usersRouter = require('./routes/users-routes');

require('dotenv').config();

const uri = process.env.MONGO_URI;
var cors = require('cors');

//& Middleware
app.use(express.json());

//& Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

//& All APIs in the "routes" folder will start with [ /api ]
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// 404 handler (أي route غلط)
app.use((req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    data: { error: 'Route Not Found' },
  });
});

// 500 handler (أي error في السيرفر)
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.statusText || httpStatusText.ERROR,
    data: { error: err.message },
  });
});

// DataBase Connection
mongoose
  .connect(uri)
  .then(() => console.log('Mongodb server started'))
  .catch((err) => console.log(err));

// Server Connection
app.listen(process.env.PORT || 4000, () => {
  console.log(`listening On Port ${process.env.PORT}`);
});
//! End Application
