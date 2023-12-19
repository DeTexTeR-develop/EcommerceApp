const express = require('express');
const router = express.Router();
const {createBlog , getABlog, getAllBlogs, updateBlog, deleteBlog, likeBlog, dislikeBlog} = require('../controllers/blogCtrl');
const {authMiddleware , isAdmin} = require('../middlewares/authmiddleware');

router.get('/', authMiddleware, isAdmin, getAllBlogs);
router.get('/:id', authMiddleware , getABlog);
router.post('/createBlog',authMiddleware , isAdmin, createBlog);
router.put('/likeBlog', authMiddleware, likeBlog);  
router.put('/dislikeBlog', authMiddleware, dislikeBlog);
router.put('/:id',authMiddleware , isAdmin, updateBlog);
router.delete('/:id', authMiddleware , isAdmin, deleteBlog);

module.exports = router;