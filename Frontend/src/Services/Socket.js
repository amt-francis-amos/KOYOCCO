import { io } from "socket.io-client";

const socket = io("https://koyocco-backend.onrender.com"); 

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

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);
});

socket.on("receiveMessage", (message) => {
  console.log("New message received:", message);
});

socket.on("chatJoined", (data) => {
  console.log(data.message);
});

export { socket, connectToChat, disconnectFromChat };
