const express = require('express');
const {createProduct, getProduct,updateProduct, getAllProducts, deleteProduct} = require('../controllers/productCtrl');
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);


module.exports = router;