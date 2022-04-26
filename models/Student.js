const mongoose = require("mongoose");

const studentSchema = {
  name: String,
  age: Number,
  isPaid: Boolean,
  account: String,
  date: Date,
}

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;