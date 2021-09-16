const mongoose = require('mongoose');
const courseDetails = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    content: [{
        itemType: { type: String },
        itemFile: { type: String }
    }]

});


module.exports = mongoose.model('CourseDetails', courseDetails);