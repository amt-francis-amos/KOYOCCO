import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyRentals = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties?propertyType=Rental'); 
        setRentals(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property rentals');
        setLoading(false);
      }
    };

    fetchPropertyRentals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Property Rentals</h1>
      {rentals.length === 0 ? (
        <p className="text-center text-gray-600">No Rental properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentals.map((rental) => (
            <div
              key={rental._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {rental.images && rental.images.length > 0 && (
                <img
                  src={rental.images[0]}
                  alt={rental.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{rental.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{rental.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-500 font-bold text-lg">${rental.price}</span>
                  <span className="text-gray-500 text-sm">{rental.location}</span>
                </div>
                <button
                  className="w-full mt-4 py-2 text-white bg-red-500 hover:bg-black font-semibold rounded-lg transition duration-300"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyRentals;
