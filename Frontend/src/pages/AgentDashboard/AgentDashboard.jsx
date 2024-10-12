import React from 'react';
import { Link } from 'react-router-dom';

const AgentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Property Listings</h2>
            <p>Number of Listings: 15</p>
            <Link to="/agent/properties" className="text-blue-600 hover:underline">View Listings</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Client Interactions</h2>
            <p>Pending Inquiries: 3</p>
            <Link to="/agent/clients" className="text-blue-600 hover:underline">Manage Clients</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Performance</h2>
            <p>Total Sales: $25,000</p>
            <Link to="/agent/performance" className="text-blue-600 hover:underline">View Performance</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;
