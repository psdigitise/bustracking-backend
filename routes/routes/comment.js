const express = require('express');
const { getComments, newComment, deleteComment ,login} = require('../controllers/commentController');
const router = express.Router();


router.post('/newcomment', newComment);
router.get('/comments', getComments);
router.delete('/comment/:id', deleteComment);
router.get('/login', login);


module.exports = router;