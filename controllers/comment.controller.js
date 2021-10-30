const Comment = require('../models/commentModel');
const addComment = async (req, res) => {
    try {
        let { email, fullName, comment } = req.body;
        let newComment = new Comment({
            email, fullName, comment
        });
        let result = await newComment.save();
        res.json({
            result: result,
            success: true
        })

    } catch (error) {
        res.json({
            result: error.message,
            success: false
        })
    }
}

const getAllComments = async (req, res) => {
    try {
        let result = await Comment.find({});
        res.json({
            result: result,
            success: true
        })

    } catch (error) {
        res.json({
            result: error.message,
            success: false
        })
    }
}

module.exports = {
    getAllComments, addComment
}