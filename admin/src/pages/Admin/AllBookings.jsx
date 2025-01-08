import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(""); // State to handle errors
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get("https://koyocco-backend.onrender.com/api/bookings", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data); // Debug the API response
        // Assuming the API response contains bookings in response.data
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else if (response.data.bookings) {
          setBookings(response.data.bookings); // Adjust for nested data
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch bookings.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 text-sm text-gray-700">Booking ID</th>
              <th className="py-3 px-4 text-sm text-gray-700">User</th>
              <th className="py-3 px-4 text-sm text-gray-700">Property</th>
              <th className="py-3 px-4 text-sm text-gray-700">Status</th>
              <th className="py-3 px-4 text-sm text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.userName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.propertyName}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{booking.status}</td>
                  <td className="py-3 px-4 text-sm">
                    <Link
                      to={`/booking-details/${booking.id}`}
                      className="text-primary hover:underline"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-3 px-4 text-sm text-center text-gray-700"
                >
                  No bookings available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
