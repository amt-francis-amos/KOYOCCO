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

  // Fetch agent's contact details
  useEffect(() => {
    const fetchAgentContact = async () => {
      if (!propertyDetail?.agentId) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/agents/${propertyDetail.agentId}`
        );
        setAgentContact(response.data);
      } catch (err) {
        setError("Failed to load agent contact information");
      } finally {
        setLoading(false);
      }
    };

    fetchAgentContact();
  }, [propertyDetail]);

  if (!propertyDetail) {
    return <div className="text-center py-8">Property not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        {propertyDetail.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={mainImage}
            alt={propertyDetail.name}
            className="w-full rounded-lg shadow-md"
          />
          <div className="flex flex-wrap gap-2 mt-6">
            {propertyDetail.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={propertyDetail.name}
                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Price:</span>
              <span className="text-lg text-red-500">₵{propertyDetail.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Location:</span>
              <span>{propertyDetail.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Type:</span>
              <span>{propertyDetail.propertyType}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Condition:</span>
              <span>{propertyDetail.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
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
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        {error && <div className="text-red-500">{error}</div>}
        {loading ? (
          <div>Loading agent contact...</div>
        ) : (
          agentContact && (
            <div>
              <h3 className="text-xl font-semibold">Agent Contact</h3>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setShowContact(!showContact)}
                  className="text-blue-500"
                >
                  {showContact ? "Hide" : "Show"} Contact Info
                </button>
                {showContact && (
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt />
                    <span>{agentContact.phone}</span>
                    <FaCommentDots />
                    <span>{agentContact.email}</span>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
