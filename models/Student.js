const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    min: 18,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
});

module.exports = mongoose.model("Student", studentSchema);
