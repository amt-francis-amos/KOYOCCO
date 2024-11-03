import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties');
        setProperties(response.data); // Assuming your API returns an array of properties
        setLoading(false);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Failed to load properties. Please try again later.');
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      {properties.map((property) => (
        <div key={property.id} className="border rounded p-4 shadow-md">
          <h3 className="text-xl font-bold">{property.name}</h3>
          <p className="text-gray-600">{property.description}</p>
          <p className="text-lg font-semibold">{`Price: $${property.price}`}</p>
          <p className="text-gray-500">{`Location: ${property.location}`}</p>
          {property.images && property.images.length > 0 && (
            <img src={property.images[0]} alt={property.name} className="mt-2 w-full h-48 object-cover rounded" />
          )}
          {property.video && (
            <video controls className="mt-2 w-full h-48 rounded">
              <source src={property.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
