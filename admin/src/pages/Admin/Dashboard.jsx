import React from "react";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="space-y-6 w-full max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-700">Admin Dashboard</h1>
        </div>

        {/* Updated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Properties</h3>
            <p className="text-4xl font-bold text-gray-800">150</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-600">Total Bookings</h3>
            <p className="text-4xl font-bold text-gray-800">120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-600">All Bookings</h3>
            <p className="text-4xl font-bold text-gray-800">200</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Recent Bookings</h3>
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
              View Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
