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
  const [userRole, setUserRole] = useState(null); // New state for user role

  // Find the property based on the URL parameter id
  const propertyDetail = property.find((prop) => prop._id === id);

  // Retrieve agent details from localStorage
  useEffect(() => {
    const storedAgent = localStorage.getItem("agentDetails");
    if (storedAgent) {
      setAgentContact(JSON.parse(storedAgent));
    }
  }, []);

  // Retrieve owner details from localStorage
  useEffect(() => {
    const storedOwner = localStorage.getItem("ownerDetails");
    if (storedOwner) {
      setOwnerContact(JSON.parse(storedOwner));
    }
  }, []);

  // Retrieve user role from localStorage or context (here assuming it's from localStorage)
  useEffect(() => {
    const role = localStorage.getItem("userRole"); // Adjust this line based on how your app stores user role
    setUserRole(role);
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

  // Dynamically define buttons based on user role
  const buttons = [
    {
      id: "contact-agent",
      type: "button",
      condition: userRole === "agent", // Show this button if the user is an agent
      onClick: () => setShowAgentContact(true),
      icon: <FaPhoneAlt className="inline-block mr-2" />,
      text: "Contact Agent",
      className: "bg-red-500 hover:bg-red-600 focus:ring-red-300",
    },
    {
      id: "whatsapp-agent",
      type: "link",
      condition: !!agentContact?.phoneNumber && userRole === "agent", // Show if agent details exist and user is agent
      href: `https://wa.me/233${agentContact?.phoneNumber}`,
      icon: <FaWhatsapp className="mr-2" />,
      text: "WhatsApp",
      className: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    },
    {
      id: "contact-owner",
      type: "button",
      condition: userRole === "owner", // Show this button if the user is a property owner
      onClick: () => setShowOwnerContact(true),
      icon: <FaPhoneAlt className="inline-block mr-2" />,
      text: "Contact Owner",
      className: "bg-red-500 hover:bg-black focus:ring-blue-300",
    },
    {
      id: "whatsapp-owner",
      type: "link",
      condition: !!ownerContact?.phoneNumber && userRole === "owner", // Show if owner details exist and user is owner
      href: `https://wa.me/233${ownerContact?.phoneNumber}`,
      icon: <FaWhatsapp className="mr-2" />,
      text: "WhatsApp",
      className: "bg-green-500 hover:bg-green-600 focus:ring-green-300",
    },
  ];

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
            <div className="flex items-center justify-start mb-4">
              <img
                src={assets.koyoccoLogo}
                alt="Company Logo"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          {/* Buttons Section (Dynamically Rendered) */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            {buttons
              .filter((btn) => btn.condition)
              .map((btn) => {
                // Common styling for both buttons and links
                const commonClasses =
                  "text-white px-6 py-3 rounded-full shadow-md w-full md:w-auto flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none focus:ring-2";
                if (btn.type === "button") {
                  return (
                    <button
                      key={btn.id}
                      onClick={btn.onClick}
                      className={`${commonClasses} ${btn.className}`}
                    >
                      {btn.icon}
                      {btn.text}
                    </button>
                  );
                } else {
                  return (
                    <a
                      key={btn.id}
                      href={btn.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${commonClasses} ${btn.className}`}
                    >
                      {btn.icon}
                      {btn.text}
                    </a>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
