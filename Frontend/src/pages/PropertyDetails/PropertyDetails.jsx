// PropertyDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../../context/PropertyContext';

const PropertyDetails = () => {
  const { id } = useParams(); // Extract property ID from URL
  const { property } = useProperty(); // Access property context
  const propertyDetail = property.find((prop) => prop._id === id); // Find property by ID

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>; // Handle case where property does not exist
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-4">{propertyDetail.name}</h2>
      <img src={propertyDetail.images[0]} alt={propertyDetail.name} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-600 mb-4">{propertyDetail.description}</p>
      <p className="text-red-500 font-bold text-lg">${propertyDetail.price}</p>
      <p className="text-gray-500 mb-4">{propertyDetail.location}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PropertyDetails;
