import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaChartBar, FaCog } from 'react-icons/fa';
import axios from 'axios';

const AdminDashboard = () => {
  const [logs, setLogs] = useState({ users: [], bookings: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }

    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/admin/dashboard', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLogs(response.data);
      } catch (error) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Card for Users */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <FaUsers className="text-red-600 text-3xl mr-2" />
              <h2 className="text-xl font-semibold">User Statistics</h2>
            </div>
            <p className="text-gray-700">Total Users: <span className="font-bold">{logs.users.length}</span></p>
            <p className="text-gray-700">Active Users: <span className="font-bold">{logs.users.filter(user => user.loginLog.length > 0).length}</span></p>
            <p className="text-gray-700">Inactive Users: <span className="font-bold">{logs.users.filter(user => user.loginLog.length === 0).length}</span></p>
          </div>

          {/* Recent Activities Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <FaChartBar className="text-red-600 text-3xl mr-2" />
              <h2 className="text-xl font-semibold">Recent Activities</h2>
            </div>
            <ul className="list-disc pl-5 text-gray-700">
              {logs.users.map(user => (
                <li key={user.email}>New user registered: <span className="font-bold">{user.firstname} {user.lastname}</span></li>
              ))}
              {logs.bookings.map(booking => (
                <li key={booking._id}>
                  New booking from: <span className="font-bold">{booking.fullName}</span> on {new Date(booking.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
            <div className="flex items-center mb-4">
              <FaCog className="text-red-600 text-3xl mr-2" />
              <h2 className="text-xl font-semibold">Quick Links</h2>
            </div>
            <div className="space-y-3">
              <Link to="/admin/users" className="text-blue-600 hover:underline hover:text-red-600">Manage Users</Link>
              <Link to="/admin/bookings" className="text-blue-600 hover:underline hover:text-red-600">Manage Bookings</Link>
              <Link to="/admin/settings" className="text-blue-600 hover:underline hover:text-red-600">Manage Settings</Link>
              <Link to="/admin/analytics" className="text-blue-600 hover:underline hover:text-red-600">View Analytics</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-full">Logout</button>
        ) : (
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/signup" className="text-white">Signup</Link>
          </div>
        )}
      </footer>
    </div>
  );
};

export default AdminDashboard;
