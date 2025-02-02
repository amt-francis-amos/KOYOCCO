import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { assets } from "../../assets/assets";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();
  const [mainImage, setMainImage] = useState(null);
  const [agentContact, setAgentContact] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Find the property based on the URL parameter id
  const propertyDetail = property.find((prop) => prop._id === id);

  // Debug: log the property details so we can see what fields are available
  useEffect(() => {
    console.log("Property Detail:", propertyDetail);
  }, [propertyDetail]);

  // Set the main image to the first image if available.
  useEffect(() => {
    if (propertyDetail?.images?.length > 0) {
      setMainImage(propertyDetail.images[0]);
    }
  }, [propertyDetail]);

  // Function to fetch agent contact details.
  const fetchAgentContact = async () => {
    setLoading(true);
    setError(null);

    if (!propertyDetail) {
      setError("Property details not found");
      setLoading(false);
      return;
    }

    // Extract the agent ID from your property object.
    // Change this logic based on the actual structure of your property object.
    // For example, if your property data uses 'createdBy' for the agent id:
    const agentId =
      propertyDetail.agent?. _id || // If the agent is nested
      propertyDetail.agentId ||     // If agentId exists
      propertyDetail.createdBy;     // If the field is named createdBy

    console.log("Extracted Agent ID:", agentId);

    if (!agentId) {
      setError("Agent information not available for this property");
      setLoading(false);
      return;
    }

    try {
      // Replace `/api/agents/` with your actual API endpoint.
      const response = await axios.get(`https://koyocco-backend.onrender.com/api/agents/${agentId}`);
      setAgentContact(response.data);
      setShowContact(true);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch agent contact details.");
    } finally {
      setLoading(false);
    }
  };

  if (!propertyDetail) {
    return <div className="text-center py-8">Loading property details...</div>;
  }

  // Change the main image when a thumbnail is clicked.
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {propertyDetail.name}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Property Image Section */}
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

        {/* Property Details Section */}
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
            <div className="flex items-center justify-start mb-4">
              <img
                src={assets.koyoccoLogo}
                alt="Company Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            {/* Contact Agent Button */}
            <button
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-black"
              } text-white px-6 py-2 rounded-full w-full md:w-auto`}
              onClick={fetchAgentContact}
              disabled={loading}
            >
              <FaPhoneAlt className="inline-block mr-2" />
              {loading ? "Loading..." : "Contact Agent"}
            </button>

            {/* WhatsApp Button */}
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-full w-full md:w-auto flex items-center justify-center hover:bg-green-600"
              onClick={() =>
                window.open("https://wa.me/233541742099", "_blank")
              }
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {/* Agent Contact Details */}
          {showContact && agentContact ? (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact</h3>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong> {agentContact.firstname}{" "}
                  {agentContact.lastname}
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
          ) : (
            <div className="mt-4 text-gray-500">
              No agent contact information available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
