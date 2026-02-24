//& Basic CRUD Application => [ Create, Read, Update, Delete ]
// ================================================================ //

//@ Start Application
const express = require('express');
const courses = require('./data/courses');
const app = express();

const coursesRouter = require('./routes/courses-routes');

//& express-validator is a set of express.js Middlewares
app.use(express.json());

app.use('/api/courses', coursesRouter); // /api/courses

app.listen(5000, () => {
  console.log('listening On Port 5000');
});
//@ End Application
