import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const PropertyRentals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null); // To show booking feedback
  const navigate = useNavigate(); // To navigate to login or other pages

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties');
        setProperties(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Handle booking process
  const handleBooking = async (property) => {
    const isAuthenticated = true; // Replace with actual authentication logic
    if (!isAuthenticated) {
      navigate('/login'); // Redirect to login page if not authenticated
      return;
    }

    const userConfirmed = window.confirm(`Are you sure you want to rent ${property.name}?`);
    if (!userConfirmed) return;

    try {
      const response = await axios.post('https://koyocco-backend.onrender.com/api/bookings', {
        propertyId: property._id,
        userId: '12345', // Replace with actual user ID from authentication
      });

      setBookingMessage(`Successfully booked ${property.name}!`);
    } catch (error) {
      setBookingMessage(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center py-4">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Property Rentals</h1>
      {bookingMessage && (
        <p className="text-center py-2 text-green-500">{bookingMessage}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
          >
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-48 sm:h-60 object-cover mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{property.name}</h2>
              <p className="text-gray-600">{property.location}</p>
              <p className="text-gray-800 font-bold text-lg mt-1">${property.price}</p>
            </div>
            <button
              onClick={() => handleBooking(property)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
            >
              Rent Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyRentals;
