const express = require('express');
const router = express.Router();
const { createBlog, getABlog, getAllBlogs, updateBlog, deleteBlog, likeBlog, dislikeBlog, uploadimages } = require('../controllers/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authmiddleware');
const { uploadPhoto, blogImgSize } = require('../middlewares/uploadimages');



router.get('/', authMiddleware, isAdmin, getAllBlogs);
router.put("/upload/:id", authMiddleware, uploadPhoto.array('image', 10), blogImgSize, uploadimages)
router.get('/:id', authMiddleware, getABlog);
router.post('/createBlog', authMiddleware, isAdmin, createBlog);
router.put('/likeBlog', authMiddleware, likeBlog);
router.put('/dislikeBlog', authMiddleware, dislikeBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;