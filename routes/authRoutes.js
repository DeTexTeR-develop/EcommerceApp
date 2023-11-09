const express = require('express');
const { createUser, loginUser, logoutUser, getAllUsers, getUser, deleteUser, handleRefreshToken, updateUser, blockUser, unblockUser } = require('../controllers/userCtrl');
const router = express.Router();
const {authMiddleware , isAdmin} = require('../middlewares/authmiddleware');

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/get-users", authMiddleware, getAllUsers);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/:id", authMiddleware,isAdmin, getUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/edit-user", authMiddleware, updateUser);
router.put("/block-user/:id", authMiddleware,isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware,isAdmin, unblockUser);



module.exports = router;