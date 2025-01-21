import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaWhatsapp, FaComments } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();

  const propertyDetail = property.find((prop) => prop._id === id);

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="bg-white shadow-lg rounded-md p-6">
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
          <div className="md:w-1/2 flex flex-col justify-between">
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
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
