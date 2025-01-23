import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShortStays = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShortStayProperties = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties?propertyType=Short-Stay'); 
        setProperties(response.data);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Short-Stay Properties</h1>
      {properties.length === 0 ? (
        <p>No Short-Stay properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div key={property._id} className="border rounded-lg p-4 shadow">
              <h2 className="text-xl font-semibold">{property.name}</h2>
              <p>{property.description}</p>
              <p>Price: ${property.price}</p>
              <p>Location: {property.location}</p>
              <div>
                {property.images && property.images.length > 0 && (
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-40 object-cover rounded-md mt-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShortStays;
