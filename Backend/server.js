const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Required for integrating Socket.IO
const { Server } = require('socket.io'); // Socket.IO server
const mongoDb = require('./config/mongoDb.js');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes'); 
const bookingRoutes = require('./routes/bookingRoutes');
const requestRoutes = require('./routes/requestRoutes');
const listingRoutes = require("./routes/listingRoutes");
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require("./routes/profileRoutes");
const contactAgentRoutes = require("./routes/contactAgentRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create an HTTP server for Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "https://koyocco.onrender.com", // Update this to your frontend's URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoDb();

// Routes
app.use('/api/auth', userRoutes); 
app.use('/api/properties', propertyRoutes); 
app.use('/api/bookings', bookingRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/post-listing', listingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', profileRoutes); 
app.use('/api', contactAgentRoutes); 
app.use('/api', listingRoutes);

// Socket.IO Logic
let activeUsers = {};

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle joining a chat
  socket.on('joinChat', ({ userId }) => {
    console.log(`User ${userId} joined the chat`);
    activeUsers[userId] = socket.id; // Save user's socket ID
    socket.emit('chatJoined', { message: 'Welcome to the chat!' });
  });

  // Handle sending messages
  socket.on('sendMessage', ({ from, to, content }) => {
    console.log(`Message from ${from} to ${to}: ${content}`);

    const recipientSocketId = activeUsers[to];
    if (recipientSocketId) {
      socket.to(recipientSocketId).emit('receiveMessage', { from, content });
    } else {
      console.log(`User ${to} is not online.`);
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    // Remove user from activeUsers
    Object.keys(activeUsers).forEach((userId) => {
      if (activeUsers[userId] === socket.id) {
        delete activeUsers[userId];
      }
    });
  });
});

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
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
