import React from 'react';

const ContactAgentModal = ({ agent, onClose }) => {
  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Contact Agent</h2>
        <p className="text-lg font-semibold">Name: {agent.name}</p>
        <p className="text-gray-600">Phone: {agent.phone}</p>
        <p className="text-gray-600">Email: {agent.email}</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ContactAgentModal;
