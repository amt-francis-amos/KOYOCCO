const express = require("express");

const router = express.Router();

const { loginAdmin, registerUser, loginUser } = require("../controllers/adminController");
const verifyToken = require('../middleware/authAdmin')


// Register a new user
router.post('/signup', registerUser);

// Login user
router.post('/login', verifyToken, loginAdmin, loginUser);


module.exports = router;
