const express = require('express');
const router = express.Router();
const{createCategory , updateCategory, deleteCategory, getCategory, getAllCategory} = require('../controllers/blogCategoryCtrl');
const{isAdmin, authMiddleware} = require('../middlewares/authmiddleware');

router.post('/', authMiddleware, createCategory);
router.put('/:id', authMiddleware, updateCategory);
router.delete('/:id', authMiddleware, deleteCategory);
router.get('/', authMiddleware, getAllCategory);
router.get('/:id', authMiddleware, getCategory);

module.exports = router;