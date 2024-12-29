import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("role");

        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch user data
        const userResponse = await axios.get("https://koyocco-backend.onrender.com/api/User/profile", config);
        setUserData(userResponse.data);

        // Fetch bookings data
        if (role === "Agent" || role === "Property Owner") {
          const bookingResponse = await axios.get("https://koyocco-backend.onrender.com/api/bookings", config);
          setBookings(bookingResponse.data);
        }

        setLoading(false);
      } catch (error) {
        setError("Failed to load data. Please try again.");
        setLoading(false);
        if (error.response?.status === 401) navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard-container flex min-h-screen">
      <aside className="sidebar w-64 bg-gray-800 text-white p-5">
        {/* Sidebar Content */}
      </aside>

      <div className="main-content flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Welcome, {userData.firstname || "User"}!</h1>

        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="p-4 bg-white shadow rounded">
                <h2 className="text-lg font-bold">{booking.propertyId?.name || "Property Name"}</h2>
                <p>Date: {booking.date}</p>
                <p>Location: {booking.propertyId?.location || "N/A"}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;
