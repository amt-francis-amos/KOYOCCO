const express = require('express');
const Request = require('../models/Request');
const router = express.Router();


router.post('/create', async (req, res) => {
    try {
      const { userName, userEmail, phone, serviceType, details, vehicleId, date, location } = req.body;
  
      // Validate the request body
      if (!userName || !userEmail || !phone || !serviceType || !details || !date || !location) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Create and save the request
      const newRequest = new Request({
        userName,
        userEmail,
        phone,
        serviceType,
        details,
        vehicleId,
        date,
        location,
      });
  
      const savedRequest = await newRequest.save();
  
      res.status(201).json({ success: true, data: savedRequest });
    } catch (err) {
      console.error('Error creating request:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  });

router.get('/', async (req, res) => {
    try {
        // Fetch all requests and populate vehicle details
        const requests = await Request.find().populate('vehicleId');
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
