const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    email: { type: String },
    fullName: { type: String },
    comment: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);