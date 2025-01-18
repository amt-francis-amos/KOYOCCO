import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import axios from "axios";

const ShortStays = () => {
  const navigate = useNavigate();
  const { listings, properties } = useProperty();
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null); // Track error state
  const exchangeRate = 10;

  useEffect(() => {
    // Simulating a fetch request, replace with actual axios call
    axios
      .get("https://koyocco-backend.onrender.com/api/listings")
      .then((response) => {
        // Assuming you're setting listings from context or API here
        // useProperty().setListings(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load listings");
        setLoading(false);
      });
  }, []);

  const handleBooking = (listing) => {
    navigate("/booking", { state: listing });
  };

  const convertToGHS = (priceInUSD) => {
    const price = parseFloat(priceInUSD.replace(/[^0-9.-]+/g, ""));
    if (isNaN(price)) {
      return "Invalid Price";
    }
    return `₵ ${(price * exchangeRate).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 w-16 h-16 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Short-Stays</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
            >
              <img
                src={listing.image}
                alt={listing.name || "Property Image"}  // Dynamic alt text
                className="w-full h-48 sm:h-60 object-cover mb-4"
                loading="lazy"  // Lazy load images
              />
              <div className="flex-grow">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">{listing.name}</h2>
                <p className="text-gray-600">{listing.location}</p>
                <p className="text-gray-600">{listing.propertyType}</p>
                <p className="text-gray-800 font-bold text-lg mt-1">
                  {convertToGHS(listing.price)}
                </p>
              </div>
              <button
                onClick={() => handleBooking(listing)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No listings available.</p>  
        )}
      </div>
    </div>
  );
};

export default ShortStays;
