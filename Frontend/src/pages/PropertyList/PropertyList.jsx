// PropertyList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto mt-10 p-5">
      <h2 className="text-3xl mb-4">Property Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <div key={property._id} className="border rounded-lg p-4 bg-white shadow-md">
            <h3 className="font-bold text-xl">{property.name}</h3>
            <p>{property.description}</p>
            <p className="font-semibold">Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            {/* Display images */}
            {property.images.map((image, index) => (
              <img key={index} src={image.url} alt={property.name} className="w-full h-48 object-cover rounded mt-2" />
            ))}
            {/* Optionally, display video if available */}
            {property.video && (
              <video controls className="mt-2 w-full rounded">
                <source src={property.video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
