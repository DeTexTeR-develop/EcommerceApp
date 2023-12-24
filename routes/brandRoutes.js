const express = require('express');
const router = express.Router();
const{createBrand, updateBrand, deleteBrand, getBrand, getAllBrand} = require('../controllers/brandCtrl');
const{authMiddleware} = require('../middlewares/authmiddleware');

router.post('/', authMiddleware, createBrand);
router.put('/:id', authMiddleware, updateBrand);
router.delete('/:id', authMiddleware, deleteBrand);
router.get('/', authMiddleware, getAllBrand);
router.get('/:id', authMiddleware, getBrand);

module.exports = router;