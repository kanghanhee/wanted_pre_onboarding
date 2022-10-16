var express = require('express');
var router = express.Router();
const postController = require('../../controller/postController');

router.get('/', postController.getPostAll);
router.get('/:postId', postController.getPostDetail);
router.post('/', postController.addPost);

module.exports = router;
