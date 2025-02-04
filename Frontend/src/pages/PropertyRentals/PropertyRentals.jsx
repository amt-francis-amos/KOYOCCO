import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const PropertyRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const fetchPropertyRentals = async () => {
    try {
      const response = await axios.get(
        "https://koyocco-backend.onrender.com/api/properties?propertyType=PropertyRentals"
      );

      const filteredRentals = response.data.filter(
        (property) => property.propertyType === "PropertyRentals"
      );

      setRentals(filteredRentals);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch property rentals");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyRentals();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Property Rentals</h1>
      {rentals.length === 0 ? (
        <p className="text-center text-gray-600">No Rental properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rentals.map((rental) => (
            <div
              key={rental._id}
              onClick={() => handleCardClick(rental._id)}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              <img src={rental.images?.[0] || "/placeholder-image.jpg"} alt={rental.name} className="w-full h-56 object-cover"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{rental.name}</h3>
                <p className="text-gray-500">{rental.location}</p>
                <p className="text-red-500 font-bold">₵{rental.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyRentals;
