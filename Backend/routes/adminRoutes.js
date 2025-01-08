const express = require("express");

const router = express.Router();

const { loginAdmin, registerUser, loginUser } = require("../controllers/adminController");
const authAdmin = require('../middleware/authAdmin')


// Register a new user
router.post('/signup', registerUser);

// Login user
router.post('/login', authAdmin , loginAdmin, loginUser);


module.exports = router;
