import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    axios.get('https://koyocco-backend.onrender.com/api/properties')
      .then(response => {
        setProperties(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('There was an error fetching the properties!', error);
        setError('Error fetching properties. Please try again later.'); // Set error state
      });
  }, []);

  const deleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      axios.delete(`https://koyocco-backend.onrender.com/api/properties/${propertyId}`)
        .then(() => {
          alert('Property deleted successfully!');
          setProperties(properties.filter(property => property._id !== propertyId));
        })
        .catch(error => {
          console.error('Error deleting property:', error);
          alert('An error occurred while deleting the property.');
        });
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Property Listings</h1>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Display error message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map(property => (
          <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link to={`/property/${property._id}`} className="block">
              <div className="relative">
                {/* Display video if available */}
                {property.video ? (
                  <video controls className="w-full h-48 object-cover">
                    <source src={`https://koyocco-backend.onrender.com/uploads/${property.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : property.images.length > 0 ? (
                  <div className="flex overflow-x-auto">
                    {property.images.map((image, index) => (
                      <img
                        key={index}
                        src={`https://koyocco-backend.onrender.com/uploads/${image}`}
                        alt={`${property.title} - ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                    <p>No media available</p>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <p className="text-gray-800 font-bold">GHS {property.price}</p>
                <p className="text-gray-600">{property.location}</p>
              </div>
            </Link>

            <button
              onClick={() => deleteProperty(property._id)}
              className="w-full py-2 px-4 bg-red-600 text-white rounded-md mt-4 hover:bg-red-700 transition duration-200"
            >
              Delete Property
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
