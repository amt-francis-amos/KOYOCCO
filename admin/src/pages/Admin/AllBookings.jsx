import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllBookings = () => {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
   
    const fetchBookings = async () => {
    
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FD]">
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Bookings</h2>
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full text-left table-auto">
            <thead className="bg-[#F2F3FF]">
              <tr>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Booking ID</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">User Name</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Property Name</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
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
                  <td colSpan="5" className="py-3 px-4 text-sm text-center text-gray-700">
                    No bookings available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
