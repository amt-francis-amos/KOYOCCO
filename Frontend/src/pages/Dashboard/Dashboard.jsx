import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null); // For detailed booking view
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

        // Fetch user profile data
        const userResponse = await axios.get("https://koyocco-backend.onrender.com/api/User/profile", config);
        setUserData(userResponse.data);
        toast.success("User data fetched successfully!");

        // Fetch booking data if user has the required role
        if (role === "Agent" || role === "Property Owner") {
          const bookingResponse = await axios.get("https://koyocco-backend.onrender.com/api/bookings", config);
          setBookings(bookingResponse.data);
          toast.success("Booking data fetched successfully!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again.");
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking); // Display detailed view of a booking
  };

  const closeBookingDetails = () => {
    setSelectedBooking(null); // Close detailed booking view
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

      <div className="main-content flex-1 p-8 bg-gray-100">
        <div className="header mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {userData.firstname}!</h1>
          <p className="text-gray-600">Role: {userData.role}</p>
          <p className="text-gray-600">Location: {userData.location}</p>
        </div>

        {userData.role === "Agent" || userData.role === "Property Owner" ? (
          <div className="bookings">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Bookings</h2>
            <div className="booking-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.length === 0 ? (
                <p>No bookings found.</p>
              ) : (
                bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="booking-card bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => handleBookingClick(booking)}
                  >
                    <div className="booking-card-header p-4 bg-blue-500 text-white">
                      <h3 className="font-semibold">{booking.propertyId?.name || "Property Name"}</h3>
                    </div>
                    <div className="booking-card-body p-4">
                      <p className="flex items-center mb-2">
                        <FaCalendarAlt className="mr-2" />
                        Date: {booking.date}
                      </p>
                      <p className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" />
                        Location: {booking.propertyId?.location || "Not available"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">You don't have access to bookings.</p>
        )}

        {selectedBooking && (
          <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="modal-content bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
              <p><strong>Property Name:</strong> {selectedBooking.propertyId?.name || "N/A"}</p>
              <p><strong>Date:</strong> {selectedBooking.date}</p>
              <p><strong>Full Name:</strong> {selectedBooking.fullName}</p>
              <p><strong>Email:</strong> {selectedBooking.email}</p>
              <p><strong>Phone Number:</strong> {selectedBooking.phoneNumber}</p>
              <div className="mt-4">
                <button
                  onClick={closeBookingDetails}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
