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
            // Liste pret à ajouter 
            list = req.files.map(elm => {
                return {
                    itemType: elm.path,
                    itemFile: getExtension(elm.originalname)
                }
            });
            let oldDetails = await CourseDetails.findOne({ course: course });
            if (!oldDetails) {
                let newDetails = new CourseDetails({
                    course: course,
                    content: list

                });
                let result = await newDetails.save();
                res.json({ success: true, "details": result })
            } else {
                let newList =oldDetails.content.concat(list);
                console.log("NEW LIST",newList) ; 
                let result = await CourseDetails.findOneAndUpdate({ course: course }, {
                    content: newList
                })
                res.json({ success: true, "details": result })
            }

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
        let result = await CourseDetails.findOne({ course: id }).populate('course');
        res.json({ success: true, "details": result })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


module.exports = {
    addNewDetails,
    getCourseDetails
}