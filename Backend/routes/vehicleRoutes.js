
const express = require('express');
const Vehicle = require('../models/vehicle'); 
const router = express.Router();

// Route to get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find(); 
    res.json(vehicles); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching vehicles' });
  }
});

// Export the router to be used in the server.js
module.exports = router;
