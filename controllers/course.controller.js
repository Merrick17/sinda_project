const Course = require("../models/course.Model");

const addNewCourse = async (req, res) => {
    try {
        let { title, desc, Instructor, category, price } = req.body;
        let img = req.file.path;
        let newCourse = new Course({
            title,
            desc,
            Instructor,
            category,
            price,
            courseImage: img
        });
        let result = await newCourse.save();
        res.json({ success: true, result: result });
    } catch (error) {
        res.json({ success: false, result: error.message });
    }
};
const getAllCourses = async (req, res) => {
    try {
        let categories = await Course.find({})
            .populate("Instructor")
            .populate("category");
        res.json({
            success: true,
            result: categories
        });
    } catch (error) {
        res.json({ success: false, result: error.message });
    }
};
const updateCourse = async (req, res) => {
    try {
        let { id } = req.params;
        let { title, desc, Instructor, category, price } = req.body;
        if (req.file) {
            let img = req.file.path;
            let result = await Course.findOneAndUpdate(id, {
                title,
                desc,
                Instructor,
                category,
                price,
                courseImage: img
            });
            res.json({
                success: true,
                result: result
            });
        } else {
            let result = await Course.findOneAndUpdate(id, {
                title,
                desc,
                Instructor,
                category,
                price
            });
            res.json({
                success: true,
                result: result
            });
        }
    } catch (error) {
        res.json({ success: false, result: error.message });
    }
};
const getCoursesByUser = async (req, res) => {
    try {
        let { id } = req.params;
        let categories = await Course.find({ Instructor: id })
            .populate("Instructor")
            .populate("category");
        res.json({
            success: true,
            result: categories
        });
    } catch (error) {
        res.json({ success: false, result: error.message });
    }
};

const deleteCourse = async (req, res) => {
    try {
        let result = await Course.findByIdAndRemove(req.params.id);
        res.json({
            success: true,
            result: result
        });
    } catch (error) {
        res.json({ success: false, result: error.message });
    }
};

module.exports = {
    addNewCourse,
    getAllCourses,
    deleteCourse,
    getCoursesByUser,
    updateCourse
};
