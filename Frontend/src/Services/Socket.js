import { io } from "socket.io-client";

const socket = io("https://koyocco-backend.onrender.com"); 

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Join a chat
  socket.emit("joinChat", { userId: "user123" });

  // Send a message
  socket.emit("sendMessage", {
    from: "user123",
    to: "agent456",
    content: "Hello! How can I help you?",
  });
});

// Listen for incoming messages
socket.on("receiveMessage", (message) => {
  console.log("New message received:", message);
});

// Handle chat joined confirmation
socket.on("chatJoined", (data) => {
  console.log(data.message);
});
