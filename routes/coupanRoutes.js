const router = require('express').Router();
const { createCoupan, getAllCoupan, updateCoupan, deleteCoupan, } = require('../controllers/coupanCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authmiddleware');

router.post('/create-coupan', authMiddleware, isAdmin, createCoupan);
router.get('/get-all-coupan', authMiddleware, getAllCoupan);
router.put('/:id', authMiddleware, isAdmin, updateCoupan);
router.delete('/:id', authMiddleware, isAdmin, deleteCoupan);



module.exports = router;
