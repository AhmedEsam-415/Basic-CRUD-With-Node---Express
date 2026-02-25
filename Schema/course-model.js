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

module.exports = mongoose.model('courses', coursesSchema);
