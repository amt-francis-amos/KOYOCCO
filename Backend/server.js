const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http"); // Required for integrating Socket.IO
const { Server } = require("socket.io"); // Socket.IO server
const mongoDb = require("./config/mongoDb.js");

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

// Active user tracking
let activeUsers = {};

io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle joining a chat
  socket.on("joinChat", ({ userId }) => {
    console.log(`User ${userId} joined the chat`);
    activeUsers[userId] = socket.id; // Save user's socket ID
    socket.emit("chatJoined", { message: "Welcome to the chat!" });
  });

  // Handle sending messages
  socket.on("sendMessage", ({ from, to, content }) => {
    console.log(`Message from ${from} to ${to}: ${content}`);

    const recipientSocketId = activeUsers[to];
    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receiveMessage", { from, content });
    } else {
      console.log(`User ${to} is not online.`);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    Object.keys(activeUsers).forEach((userId) => {
      if (activeUsers[userId] === socket.id) {
        delete activeUsers[userId];
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
