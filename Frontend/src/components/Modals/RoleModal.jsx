import React from 'react';

const RoleModal = ({ setRole, closeModal }) => {
  const handleSelectRole = (selectedRole) => {
    localStorage.setItem('role', selectedRole);
    setRole(selectedRole);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-7 rounded-lg shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl mb-4 text-center">Select Your Role</h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleSelectRole('Agent')}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Agent
          </button>
          <button
            onClick={() => handleSelectRole('Property Owner')}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Property Owner
          </button>
          <button
            onClick={() => handleSelectRole('Admin')}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
