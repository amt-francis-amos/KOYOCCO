const express = require("express");

const router = express.Router();

const { loginAdmin, registerUser, loginUser } = require("../controllers/adminController");
const authenticateToken  = require('../middleware/auth.middleware')


// Register a new user
router.post('/signup', registerUser);

// Login user
router.post('/login', authenticateToken , loginAdmin, loginUser);


module.exports = router;
