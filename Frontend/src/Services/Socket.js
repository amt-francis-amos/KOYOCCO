import { io } from "socket.io-client";

const socket = io("https://koyocco-backend.onrender.com"); 

// Define the connect and disconnect functions
const connectToChat = () => {
  console.log("Connecting to chat...");
  if (!socket.connected) {
    socket.connect();
  }
};

const disconnectFromChat = () => {
  console.log("Disconnecting from chat...");
  socket.disconnect();
};

// Handle connection events
socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

// Listen for incoming messages
socket.on("receiveMessage", (message) => {
  console.log("New message received:", message);
});

// Handle chat joined confirmation
socket.on("chatJoined", (data) => {
  console.log(data.message);
});

export { socket, connectToChat, disconnectFromChat };
