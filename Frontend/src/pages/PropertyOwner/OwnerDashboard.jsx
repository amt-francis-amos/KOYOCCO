import React from 'react';
import { Link } from 'react-router-dom';

const OwnerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-2xl font-bold">Property Owner Dashboard</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
            <p>Number of Properties: 8</p>
            <Link to="/owner/properties" className="text-blue-600 hover:underline">View Properties</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <p>Upcoming Bookings: 5</p>
            <Link to="/owner/bookings" className="text-blue-600 hover:underline">Manage Bookings</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <Link to="/owner/profile" className="text-blue-600 hover:underline">Update Profile</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerDashboard;
