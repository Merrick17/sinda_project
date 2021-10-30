const Controller = require('../controllers/comment.controller');
const router = require('express').Router();

router.get('/', Controller.getAllComments);
router.post('/add', Controller.addComment);


module.exports = router;