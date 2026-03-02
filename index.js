//& Basic CRUD Application => [ Create, Read, Update, Delete ]
// ================================================================ //

//! Start Application
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const coursesRouter = require('./routes/courses-routes');
const httpStatusText = require('./utils/httpStatuseText');

require('dotenv').config();

const uri = process.env.MONGO_URI;
var cors = require('cors');

//& Middleware
app.use(express.json());

//& Adds headers: Access-Control-Allow-Origin: *
app.use(cors());

//& [ app.use() ] is a set of express.js Middleware to use [ coursesRouter ] in the application with [ /api/courses ] as a prefix for all APIs in the [ coursesRouter ]
app.use('/api/courses', coursesRouter);

// 404 handler (أي route غلط)
app.use((req, res) => {
  res.status(404).json({
    status: httpStatusText.FAIL,
    data: { error: 'Route Not Found' },
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
