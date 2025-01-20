import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, // Prevents auto-connection
});

export const connectToChat = () => {
  if (!socket.connected) socket.connect(); // Connect when needed
};

export const disconnectFromChat = () => {
  if (socket.connected) socket.disconnect(); // Disconnect safely
};

export default socket;
