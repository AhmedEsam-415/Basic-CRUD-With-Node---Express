//& Basic CRUD Application => [ Create, Read, Update, Delete ]
// ================================================================ //

//@ Start Application
const express = require('express');
const app = express();
const coursesRouter = require('./routes/courses-routes');

//* Start Mongoose
const mongoose = require('mongoose');
const uri =
  'mongodb+srv://ahmedesam415_db_user:Gm7v1rEamolRCi2J@learn-mongodb.ltnjnuo.mongodb.net/codeZone?appName=learn-mongodb';

mongoose.connect(uri).then(() => {
  console.log('Mongodb server started');
});
//* End Mongoose

//& [ express.json() ] is a set of express.js Middleware
app.use(express.json());

// & [ app.use() ] is a set of express.js Middleware to use [ coursesRouter ] in the application with [ /api/courses ] as a prefix for all APIs in the [ coursesRouter ]
app.use('/api/courses', coursesRouter);

app.listen(5000, () => {
  console.log('listening On Port 5000');
});
//@ End Application
