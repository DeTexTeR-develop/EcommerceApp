const express = require('express');
const { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();
const {authMiddleware , isAdmin} = require('../middlewares/authmiddleware');

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/get-users", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware,isAdmin, getUser);
router.delete("/:id", authMiddleware, deleteUser);
router.put("/:id", authMiddleware, updateUser);


module.exports = router;