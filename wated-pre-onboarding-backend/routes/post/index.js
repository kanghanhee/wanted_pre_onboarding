var express = require('express');
var router = express.Router();
const postController = require('../../controller/postController');

router.get('/', postController.getPostAll);

module.exports = router;
