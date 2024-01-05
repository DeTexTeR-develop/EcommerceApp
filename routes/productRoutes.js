const express = require('express');
const { createProduct, getProduct, updateProduct, getAllProducts, deleteProduct, addToWishlist, rating, uploadimages } = require('../controllers/productCtrl');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authmiddleware');
const { uploadPhoto, productImgSize } = require('../middlewares/uploadimages');

router.post("/createProduct", authMiddleware, isAdmin, createProduct);

router.put("/upload/:id", authMiddleware, uploadPhoto.array('image', 10), productImgSize, uploadimages)

router.put("/rating", authMiddleware, isAdmin, rating);
router.get("/getAllProducts", authMiddleware, isAdmin, getAllProducts);
router.get("/:id", authMiddleware, isAdmin, getProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.put("/addToWishlist", authMiddleware, isAdmin, addToWishlist);
router.put("/rateProduct", authMiddleware, isAdmin, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);

module.exports = router;