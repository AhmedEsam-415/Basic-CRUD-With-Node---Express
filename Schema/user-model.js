const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, 'Please Enter a Valid Email'],
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    // require: false,
  },
});

//& [ mongoose.model() ] is a method to create a model from the schema and export it to be used in other files with [ users ] as a collection name in the database and [ userSchema ] as a schema for the model
module.exports = mongoose.model('users', userSchema);
