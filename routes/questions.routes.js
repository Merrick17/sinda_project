const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionController');

router.post('/add', questionsController.addNewQuestion);
router.get('/:id', questionsController.getQuestionsByCourse);
router.put('/:id', questionsController.updateQuestion);
router.delete('/:id', questionsController.deleteQuestion);










module.exports = router;