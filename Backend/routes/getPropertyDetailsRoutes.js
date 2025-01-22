const express = require('express');
const router = express.Router();
const { getPropertyDetails } = require('../controllers/getPropertyDetails');


router.get('/:id', getPropertyDetails);  
module.exports = router;