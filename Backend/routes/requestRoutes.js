const express = require('express');
const Request = require('../models/Request');
const router = express.Router();

// Submit a new service request
router.post('/create', async (req, res) => {
    try {
        const { userName, userEmail, serviceType, vehicleId, date, location } = req.body;

        // Validate required fields
        if (!userName || !userEmail || !serviceType || !vehicleId || !date || !location) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newRequest = new Request({
            userName,
            userEmail,
            serviceType,
            vehicleId,
            date,
            location,
        });

        await newRequest.save();
        res.status(201).json({ message: 'Request created successfully.', request: newRequest });
    } catch (error) {
        console.error('Error creating request:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// Fetch all requests
router.get('/', async (req, res) => {
    try {
        const requests = await Request.find().populate('vehicleId');
        res.status(200).json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
