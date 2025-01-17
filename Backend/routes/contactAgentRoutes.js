const express = require('express');
const { contactAgent } = require('../controllers/contactAgentController');

const router = express.Router();


router.post('/contact-agent', contactAgent);

module.exports = router;
