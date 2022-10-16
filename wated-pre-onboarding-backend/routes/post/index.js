var express = require('express');
var router = express.Router();
const postController = require('../../controller/postController');

router.get('/', postController.getPostAll);
router.get('/:postId', postController.getPostDetail);
router.get('/search/integration', postController.getPostSearch);
router.post('/', postController.addPost);
router.post('/apply', postController.addApplyPost);
router.patch('/:postId', postController.updatePost);
router.delete('/:postId', postController.deletePost);

module.exports = router;
