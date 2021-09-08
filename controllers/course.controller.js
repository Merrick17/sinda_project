const Course = require('../models/course.Model');

const addNewCourse = async (req, res) => {

    try {
        let { title, desc, Instructor, category, price } = req.body;
        let img = req.file.path
        let newCourse = new Course({
            title,
            desc,
            Instructor,
            category,
            price,
            courseImage: img

        });
        let result = await newCourse.save();
        res.json({ success: true, result: result })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}
const getAllCourses = async (req, res) => {

    try {
        let categories = await Course.find({}).populate('Instructor').populate('category');
        res.json({
            success: true, result: categories
        })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}



module.exports = {
    addNewCourse,
    getAllCourses
}