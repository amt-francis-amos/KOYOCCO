import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ShortStays = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router's hook for navigation

  useEffect(() => {
    const fetchShortStayProperties = async () => {
      try {
        const response = await axios.get(
          'https://koyocco-backend.onrender.com/api/properties?propertyType=Short-Stay'
        );

        const shortStayProperties = response.data.filter(
          (property) => property.propertyType === 'Short-Stay'
        );

        setProperties(shortStayProperties);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch properties');
        setLoading(false);
      }
    };

    fetchShortStayProperties();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Navigate to the booking page with property details
  const handleBooking = (property) => {
    navigate('/booking', { state: property }); // Pass the entire property object to the booking page
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Short-Stay Properties</h1>
      {properties.length === 0 ? (
        <p className="text-center text-gray-600">No Short-Stay properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.name} // Use a unique property (like name) as a key
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {property.images && property.images.length > 0 && (
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{property.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{property.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-red-500 font-bold text-lg">₵{property.price}</span>
                  <span className="text-gray-500 text-sm">{property.location}</span>
                </div>
                <button
                  onClick={() => handleBooking(property)}
                  className="w-full mt-4 py-2 text-white bg-red-500 hover:bg-black font-semibold rounded-lg transition duration-300"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortStays;
