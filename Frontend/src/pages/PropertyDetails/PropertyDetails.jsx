import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaWhatsapp, FaComments } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams(); // Extract property ID from URL
  const { property } = useProperty(); // Access property context
  const propertyDetail = property.find((prop) => prop._id === id); // Find property by ID

  // State for showing contact
  const [showContact, setShowContact] = useState(false);

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>; // Handle case where property does not exist
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-4">{propertyDetail.name}</h2>

      {/* Image section */}
      <div className="flex flex-col md:flex-row">
        <img
          src={propertyDetail.images[0]}
          alt={propertyDetail.name}
          className="w-full md:w-1/2 h-64 object-cover mb-4"
        />
        <div className="md:ml-8 flex-1">
          <p className="text-gray-600 mb-4">{propertyDetail.description}</p>
          <p className="text-red-500 font-bold text-lg mb-2">
            ₵{propertyDetail.price}
          </p>
          <p className="text-gray-500 mb-4">{propertyDetail.location}</p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Region:</strong> {propertyDetail.region}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Condition:</strong> {propertyDetail.condition}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                propertyDetail.status === "available"
                  ? "text-green-500"
                  : propertyDetail.status === "rented"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {propertyDetail.status.charAt(0).toUpperCase() +
                propertyDetail.status.slice(1)}
            </span>
          </p>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            {/* WhatsApp Button */}
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
            >
              <FaWhatsapp size={18} />
              {showContact ? propertyDetail.contact : "Show Contact"}
            </button>

            {/* Chat Button */}
            <a
              href={`https://wa.me/${propertyDetail.contact}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              <FaComments size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
