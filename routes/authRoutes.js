const express = require('express');
const { createUser,
    loginUser,
    forgetPasswordToken,
    logoutUser, changePassword,
    resetPassword,
    getAllUsers,
    getUser,
    deleteUser,
    handleRefreshToken,
    updateUser, blockUser,
    unblockUser,
    loginAdminCtrl,
    getWishlist,
    saveAddress,
    cart,
    getUserCart,
    emptyCart,
    applyCoupan,
    createOrder } = require('../controllers/userCtrl');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authmiddleware');

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdminCtrl);
router.post("/cart", authMiddleware, cart);
router.post("/create-order", authMiddleware, createOrder);
router.post("/forget-password", authMiddleware, forgetPasswordToken);
router.put("/reset-password/:token", authMiddleware, resetPassword);
router.put("/password", authMiddleware, changePassword);
router.put("/save-address", authMiddleware, saveAddress);
router.get("/get-users", authMiddleware, getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/get-wishlist", authMiddleware, getWishlist);
router.get("/get-user-cart", authMiddleware, getUserCart);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.post("/apply-coupan", authMiddleware, applyCoupan);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);



module.exports = router;