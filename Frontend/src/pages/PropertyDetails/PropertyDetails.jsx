import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const { property } = useProperty();

  const propertyDetail = property.find((prop) => prop._id === id);

  const [mainImage, setMainImage] = useState(propertyDetail?.images[0]);

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>;
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
          {/* Main image display */}
          <img
            src={mainImage}
            alt={propertyDetail.name}
            className="w-full h-[80vh] object-cover rounded-md"
          />
          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4">
            {propertyDetail.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => handleThumbnailClick(image)}
              />
            ))}
          </div>
        </div>

        {/* Right section with styling */}
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
              <strong>Status:</strong>
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
            {/* Added propertyType */}
            <p className="text-sm text-gray-600 mb-4">
              <strong>Type:</strong> {propertyDetail.propertyType}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <button className="bg-red-500 text-white px-6 py-2 hover:bg-black duration-300 rounded-full">
              <FaPhoneAlt className="inline-block mr-2" /> Contact Agent
            </button>
            <button className="bg-gray-300 text-black px-6 py-2 hover:bg-gray-400 duration-300 rounded-full">
              <FaCommentDots className="inline-block mr-2" /> Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
