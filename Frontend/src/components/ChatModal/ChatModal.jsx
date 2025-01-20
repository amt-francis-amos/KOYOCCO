import React, { useEffect, useState } from "react";
import socket, { connectToChat, disconnectFromChat } from "../../Services/Socket.js";

const ChatModal = ({ userId, agentId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    connectToChat(); 

 
    socket.emit("joinChat", { userId, agentId });

  
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, { sender: "agent", content: message }]);
    });

    return () => {
      disconnectFromChat(); 
    };
  }, [userId, agentId]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessage", { to: agentId, content: newMessage });
      setMessages((prev) => [...prev, { sender: "user", content: newMessage }]);
      setNewMessage(""); 
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat with Agent</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-lg font-bold"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4 h-72 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.sender === "user"
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-200 text-gray-800"
              } max-w-[70%] px-4 py-2 rounded-lg`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex items-center border-t p-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
