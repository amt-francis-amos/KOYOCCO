import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useProperty } from "../../context/PropertyContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();

  const [agentContact, setAgentContact] = useState(null); // State to store agent details

  const propertyDetail = property.find((prop) => prop._id === id);

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>;
  }

  // Fetch agent contact details
  const fetchAgentDetails = async () => {
    try {
      const response = await axios.get(`https://koyocco-backend.onrender.com/api/properties/${id}`);
      console.log('Response:', response.data); 
      if (response.data.agent) {
        setAgentContact(response.data.agent);
      } else {
        console.error('Agent details not found.');
      }
    } catch (error) {
      console.error('Error fetching agent details:', error.response?.data || error.message);
    }
  };
  

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {propertyDetail.name}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="md:w-1/2">
          <img
            src={propertyDetail.images[0]}
            alt={propertyDetail.name}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right section with styling */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-md p-6 flex flex-col justify-between">
          <div>
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
            <p className="text-sm text-gray-600 mb-4">
              <strong>Type:</strong> {propertyDetail.propertyType}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <button
              onClick={fetchAgentDetails}
              className="bg-red-500 text-white px-6 py-2 hover:bg-black duration-300 rounded-full"
            >
              Contact Agent
            </button>
          </div>

          {/* Display agent contact details */}
          {agentContact && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact Details</h3>
              <p className="text-gray-700 mb-1">
                <strong>Name:</strong> {agentContact.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {agentContact.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {agentContact.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
