import React, { useState, useEffect } from "react";
import { useProperty } from "../context/PropertyContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams(); // To fetch the ID from the URL params
  const { property } = useProperty(); // Fetch property data from context
  const propertyDetail = property.find((prop) => prop._id === id);

  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [agentContact, setAgentContact] = useState(null);
  const [showContact, setShowContact] = useState(false);

  // Fetch agent contact details
  const fetchAgentContact = async () => {
    setLoading(true);
    setError(null);

    if (!propertyDetail) {
      setError("Property details not found");
      setLoading(false);
      return;
    }

    const agentId = propertyDetail?.agent?._id || propertyDetail?.agentId;
    if (!agentId) {
      setError("No agent information available.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://koyocco-backend.onrender.com/api/agent/${agentId}`
      );

      if (response.status === 200 && response.data) {
        setAgentContact(response.data);
        setShowContact(true);
      } else {
        setError("Agent details not found.");
      }
    } catch (err) {
      console.error("Error fetching agent details:", err);
      setError("Unable to fetch agent contact details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (propertyDetail?.images?.length > 0) {
      setMainImage(propertyDetail.images[0]);
    } else {
      setMainImage(null); // Fallback in case of no images
    }
  }, [propertyDetail]);

  // Fetch agent contact when the component is mounted
  useEffect(() => {
    fetchAgentContact();
  }, [propertyDetail]);

  // Loading and error handling UI
  if (loading) {
    return <div className="text-center py-8">Loading agent contact details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!propertyDetail) {
    return <div className="text-center py-8">Property details not available.</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">{propertyDetail.name}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Property Image Section */}
        <div className="md:w-1/2">
          <img
            src={mainImage || "/placeholder-image.jpg"}
            alt={propertyDetail.name}
            className="w-full h-[37.5rem] object-cover rounded-md"
          />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {propertyDetail.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer flex-shrink-0"
                onClick={() => setMainImage(image)}
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
                    : "text-red-500"
                }`}
              >
                {propertyDetail.status}
              </span>
            </p>

            {/* Agent Contact Info */}
            {showContact && agentContact && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Contact Agent</h3>
                <p className="flex items-center mt-2">
                  <FaPhoneAlt className="mr-2" />
                  {agentContact.phoneNumber}
                </p>
                <p className="flex items-center mt-2">
                  <FaWhatsapp className="mr-2" />
                  {agentContact.whatsapp}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
