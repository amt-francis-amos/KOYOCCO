import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();
  const [showContactForm, setShowContactForm] = useState(false);

  const propertyDetail = property.find((prop) => prop._id === id);

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>;
  }

  const handleContactAgent = () => {
    setShowContactForm(!showContactForm);
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

        {/* Right section */}
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

          <div className="flex flex-col items-center gap-4 mt-6">
            <button
              className="bg-red-500 text-white px-6 py-2 hover:bg-black duration-300 rounded-full"
              onClick={handleContactAgent}
            >
              Contact Agent
            </button>

            {/* Contact Form */}
            {showContactForm && (
              <div className="w-full mt-4 bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold mb-2">Contact {propertyDetail.agentName}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Email: <a href={`mailto:${propertyDetail.agentEmail}`} className="text-blue-500">{propertyDetail.agentEmail}</a>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Phone: <a href={`tel:${propertyDetail.agentPhone}`} className="text-blue-500">{propertyDetail.agentPhone}</a>
                </p>
                <form className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full border border-gray-300 rounded-md p-2"
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
