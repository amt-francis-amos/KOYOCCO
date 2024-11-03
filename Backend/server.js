const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');




const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
db();



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/bookings', bookingRoutes); 


// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Default 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
