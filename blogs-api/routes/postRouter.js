const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

router.get('/', postController.getAll);
router.get('/:id');
router.post('/', postController.createPost);
router.put('/:id');

module.exports = router;