const express = require('express');
const { loginAdmin, registerUser, loginUser } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerUser)
router.post('/signin', loginUser)

module.exports = router;
