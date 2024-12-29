import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
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

        const userResponse = await axios.get("https://koyocco-backend.onrender.com/api/User/profile", config);
        setUserData(userResponse.data); // Set the user data

        if (role === "Agent") {
          const bookingResponse = await axios.get("https://koyocco-backend.onrender.com/api/bookings", config);
          setBookings(bookingResponse.data); // Set the bookings data
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response.status === 401) {
          navigate("/login");
        } else {
          alert("An error occurred while fetching the data.");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };

  return (
    <div className="dashboard-container flex min-h-screen">
      <aside className="sidebar w-64 bg-gray-800 text-white p-5">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
        <ul>
          <li
            className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={handleProfileClick}
          >
            <FaUser className="inline-block mr-2" />
            Profile
          </li>
          <li className="mb-4 hover:bg-gray-700 p-2 rounded cursor-pointer">
            <FaCalendarAlt className="inline-block mr-2" />
            Your Bookings
          </li>
        </ul>
      </aside>

      <div className="main-content flex-1 p-8 bg-gray-100 flex flex-col">
        <div className="header mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {userData.firstname}!</h1>
          <p className="text-gray-600">Role: {userData.role}</p>
          <p className="text-gray-600">Location: {userData.location}</p>
        </div>

        {userData.role === "Customer" && (
          <div className="bookings">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>
            <div className="booking-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="booking-card-header p-4 bg-blue-500 text-white">
                    <h3 className="font-semibold">{booking.propertyId.name}</h3> {/* Assuming you populate 'propertyId' */}
                  </div>
                  <div className="booking-card-body p-4">
                    <p className="flex items-center mb-2">
                      <FaCalendarAlt className="mr-2" />
                      Date: {booking.date}
                    </p>
                    <p className="flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      Location: {booking.propertyId.location} {/* Assuming you populate location */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
