import React from 'react';
import { useParams } from 'react-router-dom';
import { useFeaturedProperties } from '../../context/FeaturedPropertiesContext';

const PropertyDetails = () => {
  const { id } = useParams(); 
  const { featuredProperties } = useFeaturedProperties();

  const property = featuredProperties.find((property) => property.id === Number(id));

  return (
    <div className="max-w-[600px] mx-auto my-12">
      {property ? (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{property.location}</p>
            <p className="text-xl font-semibold text-red-600 mb-4">{property.price}</p>
            <p className="text-gray-800 mb-4">{property.description || "No description available."}</p>
            <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition">
              Contact Agent
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Property not found</p>
      )}
    </div>
  );
};

export default PropertyDetails;
