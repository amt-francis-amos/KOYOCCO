const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoDb = require('./config/mongoDb.js');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const requestRoutes = require('./routes/requestRoutes');
const listingRoutes = require("./routes/listingRoutes");
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require("./routes/profileRoutes");
const agentRoutes = require('./routes/agentRoutes');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoDb();

// Routes
app.use('/api', agentRoutes);
app.use('/api/auth', userRoutes); 
app.use('/api/properties', propertyRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/post-listing', listingRoutes); 
app.use('/api/admin', adminRoutes); 
app.use('/api/user', profileRoutes); 


// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
  next();
});

// Default 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
