import React from 'react';
import { useProperty } from '../../context/PropertyContext'; // Adjust the import path as necessary

const PropertyList = () => {
  const { property } = useProperty(); // Get the property data from context

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
                  src={item.images[0]} // Display the first image as a thumbnail
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-xl font-semibold text-red-600">${item.price}</p>
                <p className="text-gray-500">{item.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyList;
