const express = require('express');
const { createUser, loginUser, getAllUsers , getUser, deleteUser, updateUser} = require('../controllers/userController');
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/get-users",getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);


module.exports = router;