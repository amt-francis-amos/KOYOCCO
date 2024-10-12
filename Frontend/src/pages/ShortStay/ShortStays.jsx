import React from "react";
import { useNavigate } from "react-router-dom";
import { listings } from "../../assets/assets";

const ShortStays = () => {
  const navigate = useNavigate();

  const handleBooking = (listing) => {
    navigate("/booking", { state: listing });
  };

  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Short-Stays</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
          >
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-48 sm:h-60 object-cover mb-4"
            />
            <div className="flex-grow">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">{listing.name}</h2>
              <p className="text-gray-600">{listing.location}</p>
              <p className="text-gray-800 font-bold text-lg mt-1">{listing.price}</p>
            </div>
            <button
              onClick={() => handleBooking(listing)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
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
