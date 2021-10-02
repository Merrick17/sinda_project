const QuestionModel = require('../models/courseQuestions');

const addNewQuestion = async (req, res) => {

    try {
        let { title,
            Course,
            options,
            rightAnswer,
            score } = req.body;
        let newQuestion = new QuestionModel({ title, Course, options, rightAnswer, score });
        let result = await newQuestion.save();
        res.json({ success: true, result: result })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}

const getQuestionsByCourse = async (req, res) => {

    try {
        let { id } = req.params;
        console.log("id", id);
        let questionsList = await QuestionModel.find({ Course: id }).populate('Course');

        res.json({ success: true, result: questionsList })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}
const deleteQuestion = async (req, res) => {
    try {
        let { id } = req.params;

        await QuestionModel.findByIdAndDelete(id);

        res.json({ success: true, result: "Deleted" })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}
const updateQuestion = async (req, res) => {
    try {
        let { id } = req.params;
        let dataToUpdate = req.body;
        let { ...updateData } = dataToUpdate;
        let result = await QuestionModel.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ success: true, result: "Updated.." })
    } catch (error) {
        res.json({ success: false, result: error.message })
    }
}


module.exports = {
    addNewQuestion,
    getQuestionsByCourse,
    deleteQuestion,
    deleteQuestion,
    updateQuestion

}