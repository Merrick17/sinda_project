const CourseDetails = require('../models/courseDetails');

const getExtension = (name) => {
    let dot = name.lastIndexOf(".");
    let type = name.substring(dot, name.length);
    return type;
}
const addNewDetails = async (req, res) => {

    try {
        let list;
        let { course } = req.body;
        if (req.files) {
            console.log("FILES", req.files);
            list = req.files.map(elm => {
                return {
                    itemType: elm.path,
                    itemFile: getExtension(elm.originalname)
                }
            });
            let newDetails = new CourseDetails({
                course: course,
                content: list

            });
            let result = await newDetails.save();
            res.json({ success: true, "details": result })
        } else {
            res.json({ success: false, message: "no items provided" })
        }

    } catch (error) {
        console.log(error.message);
    }
}

 const getCourseDetails = async (req, res) => {
    try {
        let { id } = req.params;
        let result = await CourseDetails.findOne({course:id});
        res.json({ success: true, "details": result })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


module.exports = {
    addNewDetails, 
    getCourseDetails
}