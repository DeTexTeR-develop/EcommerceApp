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
    loginAdminCtrl } = require('../controllers/userCtrl');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/authmiddleware');

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdminCtrl);
router.post("/forget-password", authMiddleware, forgetPasswordToken);
router.put("/reset-password/:token", authMiddleware, resetPassword);
router.put("/password", authMiddleware, changePassword);
router.get("/get-users", authMiddleware, getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);



module.exports = router;