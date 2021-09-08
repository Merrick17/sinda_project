const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(
            null,

            file.originalname.trim()
        );
    },
});
const upload = multer({ storage: storage });

router.post('/addcourse',upload.single('courseImage'), courseController.addNewCourse);
router.get('/',courseController.getAllCourses) ; 




module.exports = router ; 