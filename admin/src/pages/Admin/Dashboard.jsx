import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700">
            View Reports
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700">
            Manage Users
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Properties */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Properties</h3>
          <p className="text-4xl font-bold text-gray-800">150</p>
        </div>
        {/* Total Appointments */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Appointments</h3>
          <p className="text-4xl font-bold text-gray-800">120</p>
        </div>
        {/* Pending Payments */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Pending Payments</h3>
          <p className="text-4xl font-bold text-gray-800">50</p>
        </div>
      </div>

      {/* Recent Properties and Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Recent Properties</h3>
          <ul className="space-y-4 mt-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Luxury Villa</span>
              <span className="text-gray-500">Posted 3 hours ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Modern Apartment</span>
              <span className="text-gray-500">Posted 1 day ago</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Beachfront Property</span>
              <span className="text-gray-500">Posted 2 days ago</span>
            </li>
          </ul>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700">Recent Appointments</h3>
          <ul className="space-y-4 mt-4">
            <li className="flex justify-between items-center">
              <span className="text-gray-600">John Doe - 10:00 AM</span>
              <span className="text-gray-500">Today</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Jane Smith - 11:30 AM</span>
              <span className="text-gray-500">Today</span>
            </li>
            <li className="flex justify-between items-center">
              <span className="text-gray-600">Michael Lee - 1:00 PM</span>
              <span className="text-gray-500">Tomorrow</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700">
            Add New Property
          </button>
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700">
            Manage Users
          </button>
          <button className="bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-yellow-700">
            View Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
