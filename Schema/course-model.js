const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});

//& [ mongoose.model() ] is a method to create a model from the schema and export it to be used in other files with [ courses ] as a collection name in the database and [ coursesSchema ] as a schema for the model
module.exports = mongoose.model('courses', coursesSchema);
