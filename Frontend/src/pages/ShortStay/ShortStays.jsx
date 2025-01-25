import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShortStays = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShortStayProperties = async () => {
      try {
        const response = await axios.get(
          "https://koyocco-backend.onrender.com/api/properties?propertyType=Short-Stay"
        );
        setProperties(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch properties. Please try again.");
        setLoading(false);
      }
    };

    fetchShortStayProperties();
  }, []);

  const handleBookNow = (property) => {
    navigate("/booking", { state: property });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Short-Stay Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
          >
            <img
              src={property.imageUrl}
              alt={property.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{property.name}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-gray-800 font-bold mb-4">${property.price}</p>
            <button
              onClick={() => handleBookNow(property)}
              className="mt-auto bg-red-500 text-white py-2 px-4 rounded hover:bg-black"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortStays;
