const express = require('express');
const router = express.Router();
const courseDetailsController = require('../controllers/coursedtails.controller');
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

router.post('/add', upload.array('items'), courseDetailsController.addNewDetails);
router.get('/:id',courseDetailsController.getCourseDetails) ; 

module.exports = router;