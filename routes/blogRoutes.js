const express = require('express');
const router = express.Router();
const {createBlog , updateBlog} = require('../controllers/blogCtrl');
const {authMiddleware} = require('../middlewares/authmiddleware');

router.post('/createBlog',authMiddleware, createBlog);
router.put('/:id',authMiddleware, updateBlog);

module.exports = router;