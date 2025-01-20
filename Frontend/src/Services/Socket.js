import { io } from "socket.io-client";

let socket;

export const connectToChat = () => {
  socket = io("https://koyocco-backend.onrender.com", {
    transports: ["websocket"], 
    reconnection: true, 
  });

  socket.on("connect", () => {
    console.log("Connected to chat server");
  });

  socket.on("connect_error", (err) => {
    console.error("Connection Error:", err.message);
  });
};

export const disconnectFromChat = () => {
  if (socket) {
    socket.disconnect();
    console.log("Disconnected from chat server");
  }
};

export default socket;
