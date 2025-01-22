
const express = require('express');
const router = express.Router();
const { getPropertyDetails, addAgentDetails } = require('../controllers/getPropertyDetails');


router.get('/:id', getPropertyDetails);

router.post('/:id/agent', addAgentDetails);

module.exports = router;
