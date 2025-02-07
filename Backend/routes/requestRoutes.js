const express = require('express');
const Request = require('../models/Request'); 
const router = express.Router();


router.post('/create', async (req, res) => {
  try {
    const { userName, userEmail, phone, serviceType, details, date, location, carType, description, registrationNumber, region, driverContact } = req.body;

    if (!userName || !userEmail || !phone || !serviceType || !date || !location || !carType || !description || !registrationNumber || !region || !driverContact) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (serviceType !== 'relocation') {
      return res.status(400).json({ error: 'Invalid service type. Only "relocation" is allowed.' });
    }

    const newRequest = new Request({
      userName,
      userEmail,
      phone,
      serviceType,
      details,
      date,
      location,
      carType,
      description,
      registrationNumber,
      region,
      driverContact,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (err) {
    console.error('Error creating request:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});




// --GET request to fetch all relocation requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
