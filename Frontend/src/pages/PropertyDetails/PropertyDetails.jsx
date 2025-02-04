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
  const [ownerContact, setOwnerContact] = useState(null);
  const [showAgentContact, setShowAgentContact] = useState(false);
  const [showOwnerContact, setShowOwnerContact] = useState(false);

  const propertyDetail = property.find((prop) => prop._id === id);

  useEffect(() => {
    const storedAgent = localStorage.getItem("agentDetails");
    if (storedAgent) {
      setAgentContact(JSON.parse(storedAgent));
    }
  }, []);

  useEffect(() => {
    const storedOwner = localStorage.getItem("ownerDetails");
    if (storedOwner) {
      setOwnerContact(JSON.parse(storedOwner));
    }
  }, []);

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
      <h2 className="text-3xl font-bold mb-6 text-center">
        {propertyDetail.name}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <img
            src={mainImage || "/placeholder-image.jpg"}
            alt={propertyDetail.name}
            className="w-full h-[37.5rem] object-cover rounded-md"
          />
          <img
            src={assets.koyoccoLogo}
            alt="Company Logo"
            className="absolute top-4 left-4 h-16 w-16 opacity-50"
          />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {propertyDetail.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer flex-shrink-0 hover:opacity-80 transition-all duration-200"
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

            {/* Logo */}
            <div className="flex items-center justify-start mb-4">
              <img
                src={assets.koyoccoLogo}
                alt="Company Logo"
                className="h-10 w-10 object-contain"
              />
            </div>

            {/* Video Section - Moved Below Logo */}
            {propertyDetail.video && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Property Video</h3>
                <video
                  controls
                  className="w-full h-64 rounded-md"
                  src={propertyDetail.video}
                />
              </div>
            )}
          </div>

          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => setShowAgentContact(true)}
              className="w-30 bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition-all"
            >
              <FaPhoneAlt />
              Contact Agent
            </button>

            {agentContact?.phoneNumber && (
              <a
                href={`https://wa.me/233${agentContact.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-30 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all"
              >
                <FaWhatsapp />
                Agent WhatsApp
              </a>
            )}

            <button
              onClick={() => setShowOwnerContact(true)}
              className="w-30 bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black transition-all"
            >
              <FaPhoneAlt />
              Contact Owner
            </button>

            {ownerContact?.phoneNumber && (
              <a
                href={`https://wa.me/233${ownerContact.phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-30 bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-600 transition-all"
              >
                <FaWhatsapp />
                Owner WhatsApp
              </a>
            )}
          </div>

          {/* Agent Contact Info */}
          {showAgentContact && agentContact && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact</h3>
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
            </div>
          )}

          {/* Owner Contact Info */}
          {showOwnerContact && ownerContact && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Owner Contact</h3>
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
