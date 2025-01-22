const express = require('express');
const router = express.Router();
const { getPropertyDetails } = require('../controllers/propertyController');

router.get('/properties/:id', getPropertyDetails);

module.exports = router;
