const express = require('express');
const app = express();
app.use(express.json());

// Mock database
const userRequests = [];

// Create Request Endpoint
app.post('/api/create-request', (req, res) => {
    const { name, email, phone, requestType, details } = req.body;

    if (!name || !email || !phone || !requestType) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newRequest = {
        id: userRequests.length + 1,
        name,
        email,
        phone,
        requestType,
        details,
        date: new Date(),
    };

    userRequests.push(newRequest);
    res.status(201).json({ message: 'Request created successfully.', request: newRequest });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
