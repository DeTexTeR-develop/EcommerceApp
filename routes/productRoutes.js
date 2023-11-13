const express = require('express');
const {createProduct, getProduct,updateProduct, getAllProducts, deleteProduct} = require('../controllers/productCtrl');
const router = express.Router();
const {isAdmin , authMiddleware} = require('../middlewares/authmiddleware')

router.post("/createProduct",authMiddleware, isAdmin , createProduct);
router.get("/getAllProducts",authMiddleware, isAdmin , getAllProducts);
router.get("/:id",authMiddleware, isAdmin , getProduct);
router.delete("/:id",authMiddleware, isAdmin , deleteProduct);
router.put("/:id",authMiddleware, isAdmin , updateProduct);

module.exports = router;