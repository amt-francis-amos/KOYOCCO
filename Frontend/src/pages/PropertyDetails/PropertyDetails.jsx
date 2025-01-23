import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();
  const [mainImage, setMainImage] = useState(null);
  const [agentContact, setAgentContact] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Find the property based on the ID
  const propertyDetail = property.find((prop) => prop._id === id);

  // Debug log to check property data
  useEffect(() => {
    console.log("Property Data:", property);
    if (propertyDetail) {
      console.log("Property Detail:", propertyDetail);
      console.log("Agent ID:", propertyDetail.agentId);
    }
  }, [propertyDetail]);

  // Set the main image once propertyDetail is loaded
  useEffect(() => {
    if (propertyDetail?.images?.length > 0) {
      setMainImage(propertyDetail.images[0]);
    }
  }, [propertyDetail]);

  // Enhanced fetchAgentContact function with better error handling
  const fetchAgentContact = async () => {
    setLoading(true);
    setError(null);

    // Check if propertyDetail exists
    if (!propertyDetail) {
      setError("Property details not found");
      setLoading(false);
      return;
    }

    // Check if agentId exists
    if (!propertyDetail.agentId) {
      setError("Agent information not available for this property");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://koyocco-backend.onrender.com/api/agents/${propertyDetail.agentId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            
          }
        }
      );

      console.log("Agent Response:", response);
      if (response.data) {
        setAgentContact(response.data);
        setShowContact(true);
      } else {
        setError("No agent data received");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error fetching agent contact information");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!propertyDetail) {
    return <div className="text-center py-8">Loading property details...</div>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">{propertyDetail.name}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="md:w-1/2">
          <img
            src={mainImage || "/placeholder-image.jpg"}
            alt={propertyDetail.name}
            className="w-full h-[37.5rem] object-cover rounded-md"
          />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {propertyDetail.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer flex-shrink-0"
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Right section */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-md p-6 flex flex-col justify-between">
          <div>
            <p className="text-gray-600 mb-4">{propertyDetail.description}</p>
            <p className="text-red-500 font-bold text-lg mb-2">₵{propertyDetail.price}</p>
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
              className="bg-red-500 text-white px-6 py-2 hover:bg-black duration-300 rounded-full w-full md:w-auto"
              onClick={fetchAgentContact}
              disabled={loading}
            >
              <FaPhoneAlt className="inline-block mr-2" />
              {loading ? "Loading..." : "Contact Agent"}
            </button>
            <button className="bg-gray-300 text-black px-6 py-2 hover:bg-gray-400 duration-300 rounded-full w-full md:w-auto">
              <FaCommentDots className="inline-block mr-2" /> Start Chat
            </button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Agent Contact Display */}
          {showContact && agentContact && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact</h3>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {agentContact.firstname} {agentContact.lastname}
                </p>
                <p>
                  <strong>Phone:</strong> {agentContact.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {agentContact.email}
                </p>
                <p>
                  <strong>Location:</strong> {agentContact.location}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
