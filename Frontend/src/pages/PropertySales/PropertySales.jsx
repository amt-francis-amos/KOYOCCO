import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertySales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPropertySales = async () => {
    try {
      const response = await axios.get(
        'https://koyocco-backend.onrender.com/api/properties?propertyType=PropertySales'
      );

      // Filter properties on the frontend for extra safety
      const filteredSales = response.data.filter(
        (property) => property.propertyType === 'PropertySales'
      );

      setSales(filteredSales);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch property sales');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertySales();
  }, []);

  const handlePropertyUpload = async () => {
    // Simulate property upload to refresh the sales
    await fetchPropertySales();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Property Sales</h1>
      {sales.length === 0 ? (
        <p className="text-center text-gray-600">No Sales properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sales.map((sale) => (
            <div
              key={sale._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              {sale.images && sale.images.length > 0 && (
                <img
                  src={sale.images[0]}
                  alt={sale.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{sale.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{sale.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-500 font-bold text-lg">${sale.price}</span>
                  <span className="text-gray-500 text-sm">{sale.location}</span>
                </div>
                <button
                  className="w-full mt-4 py-2 text-white bg-red-500 hover:bg-black font-semibold rounded-lg transition duration-300"
                  onClick={handlePropertyUpload}
                >
                  Book Sales
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertySales;
