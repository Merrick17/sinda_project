const mongoose = require("mongoose");
const CourseModel = new mongoose.Schema({
  title: { type: String, required: true },
  desc: {
    type: String,
    required: true
  },
  Instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  courseImage: { type: String, required: true },
  price: { type: Number, default: 0 },
  subscribedStudents: []
});

module.exports = mongoose.model("Course", CourseModel);
