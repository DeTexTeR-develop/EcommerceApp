const express = require('express');
const router = express.Router();
const {createBlog , getABlog, getAllBlogs, updateBlog, deleteBog} = require('../controllers/blogCtrl');
const {authMiddleware} = require('../middlewares/authmiddleware');

router.get('/', authMiddleware, getAllBlogs);
router.get('/:id', authMiddleware, getABlog);
router.post('/createBlog',authMiddleware, createBlog);
router.put('/:id',authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBog);

module.exports = router;