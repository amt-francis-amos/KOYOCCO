const express = require('express');
const { loginAdmin } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/login', loginAdmin);

module.exports = router;
