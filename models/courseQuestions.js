const mongoose = require("mongoose");
const CourseQuestion = new mongoose.Schema({
    title: String,
    Course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    options: [String],
    rightAnswer: String, 
    score:Number
});

module.exports = mongoose.model("CourseQuestion", CourseQuestion);
