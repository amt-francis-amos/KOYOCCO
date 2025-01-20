import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectToChat = () => {
  if (!socket.connected) socket.connect(); 
};

export const disconnectFromChat = () => {
  if (socket.connected) socket.disconnect(); 
};

export default socket;
