import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { assets } from "../../assets/assets";



const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();
  const [mainImage, setMainImage] = useState(null);
  const [agentContact, setAgentContact] = useState(null);
  const [ownerContact, setOwnerContact] = useState(null);  // State for owner contact details
  const [showContact, setShowContact] = useState(false);

  // Find the property based on the URL parameter id
  const propertyDetail = property.find((prop) => prop._id === id);

  // Retrieve agent and owner details from localStorage
  useEffect(() => {
    const storedAgent = localStorage.getItem("agentDetails");
    if (storedAgent) {
      setAgentContact(JSON.parse(storedAgent));
    }

    const storedOwner = localStorage.getItem("ownerDetails");
    if (storedOwner) {
      setOwnerContact(JSON.parse(storedOwner));  // Set owner contact details
    }
  }, []);

  // Set the main image
  useEffect(() => {
    if (propertyDetail?.images?.length) {
      setMainImage(propertyDetail.images[0]);
    }
  }, [propertyDetail?.images]);

  if (!propertyDetail) {
    return (
      <div className="text-center py-8 text-red-500 font-semibold">
        Property not found or unavailable.
      </div>
    );
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

            {/* Property Owner Contact Details */}
            {ownerContact && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h3 className="text-lg font-bold mb-2">Property Owner Contact</h3>
                <div className="flex items-center space-x-4">
                  <img
                    src={ownerContact.profileImage || "/default-owner-image.jpg"}
                    alt="Owner Profile"
                    className="w-16 h-16 object-cover rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {ownerContact.firstname} {ownerContact.lastname}
                    </p>
                    <p>
                      <strong>Phone:</strong>{" "}
                      <a
                        href={`tel:${ownerContact.phoneNumber}`}
                        className="text-blue-500 hover:underline"
                      >
                        {ownerContact.phoneNumber}
                      </a>
                    </p>
                    <p>
                      <strong>Location:</strong>{" "}
                      {ownerContact.location || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            {/* Contact Agent Button */}
            <button
              className="bg-red-500 hover:bg-black text-white px-6 py-2 rounded-full w-full md:w-auto"
              onClick={() => setShowContact(true)}
            >
              <FaPhoneAlt className="inline-block mr-2" />
              Contact Agent
            </button>

            {/* WhatsApp Button */}
            {agentContact?.phoneNumber && (
              <a
                href={`https://wa.me/233${agentContact.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-2 rounded-full w-full md:w-auto flex items-center justify-center hover:bg-green-600"
              >
                <FaWhatsapp className="mr-2" /> WhatsApp
              </a>
            )}
          </div>

          {/* Agent Contact Details */}
          {showContact && agentContact ? (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={agentContact.profileImage || "/default-agent-image.jpg"}
                  alt="Agent Profile"
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {agentContact.firstname} {agentContact.lastname}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a
                      href={`tel:${agentContact.phoneNumber}`}
                      className="text-blue-500 hover:underline"
                    >
                      {agentContact.phoneNumber}
                    </a>
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {agentContact.location || "Unknown"}
                  </p>
                </div>
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
