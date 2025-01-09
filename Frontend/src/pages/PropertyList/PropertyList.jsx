import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useProperty } from '../../context/PropertyContext';

const PropertyList = () => {
  const { property, setProperty } = useProperty();
  const [toastMessage, setToastMessage] = useState(null);

  // Effect to trigger toast notifications when toastMessage changes
  useEffect(() => {
    if (toastMessage) {
      toast(toastMessage); // Trigger toast based on the message
    }
  }, [toastMessage]); // This will run whenever toastMessage changes

  const handleDelete = async (id) => {
    console.log("Deleting property with ID:", id); // Log the ID being sent
    try {
      // Send the delete request
      const response = await axios.delete(`https://koyocco-backend.onrender.com/api/properties/${id}`);

      // Check for successful deletion (status 200 is a common success code)
      if (response.status === 200) {
        // Filter out the deleted property from the state
        setProperty(prevProperty => prevProperty.filter((item) => item._id !== id));

        // Set the success message to trigger the success toast
        setToastMessage('Property deleted successfully');
      } else {
        // Set the error message if response status isn't 200
        setToastMessage('Failed to delete the property. Please try again.');
      }
    } catch (error) {
      // Catch any errors (e.g., network issues, server errors)
      console.error("Error deleting property:", error);
      setToastMessage('Failed to delete the property. Please try again.');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Property Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {property.length === 0 ? (
          <p className="text-center text-gray-500">No properties available.</p>
        ) : (
          property.map((item) => (
            <div key={item._id} className="border rounded-lg overflow-hidden shadow-md">
              {item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              )}
              {item.video && (
                <video controls className="w-full h-40 mt-2">
                  <source src={item.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-xl font-semibold text-red-600">${item.price}</p>
                <p className="text-gray-500">{item.location}</p>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-4 bg-red-600 text-white rounded-md p-2 hover:bg-red-700"
                >
                  Delete Property
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyList;
