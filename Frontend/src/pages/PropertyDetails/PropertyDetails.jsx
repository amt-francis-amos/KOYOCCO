import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://koyocco-backend.onrender.com/api/properties/${id}`
        );
        const data = response.data;

        if (!data) {
          setError("Property not found.");
        } else {
          setPropertyDetail(data);
          setMainImage(data.images?.[0] || null); // Handle cases where images may be empty
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetail();
  }, [id]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (loading) {
    return <div className="text-center py-8">Loading property details...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (!propertyDetail) {
    return <div className="text-center py-8">Property not found.</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">{propertyDetail.name || "No name available"}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="md:w-1/2">
          <img
            src={mainImage || "/placeholder-image.jpg"}
            alt={propertyDetail.name || "No image available"}
            className="w-full h-[37.5rem] object-cover rounded-md"
          />
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {propertyDetail.images && propertyDetail.images.length > 0 ? (
              propertyDetail.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="w-24 h-24 object-cover rounded-md cursor-pointer flex-shrink-0"
                  onClick={() => handleThumbnailClick(image)}
                />
              ))
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-md p-6">
          <div>
            <p className="text-gray-600 mb-4">{propertyDetail.description || "No description available."}</p>
            <p className="text-red-500 font-bold text-lg mb-2">₵{propertyDetail.price || "Not specified"}</p>
            <p className="text-gray-500 mb-4">{propertyDetail.location || "No location available"}</p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Region:</strong> {propertyDetail.region || "Not specified"}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Condition:</strong> {propertyDetail.condition || "Not specified"}
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
                {propertyDetail.status
                  ? propertyDetail.status.charAt(0).toUpperCase() + propertyDetail.status.slice(1)
                  : "Not specified"}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Type:</strong> {propertyDetail.propertyType || "Not specified"}
            </p>
          </div>

          {/* Agent Contact Section */}
          {propertyDetail.agentId && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact</h3>
              <div className="space-y-2">
                <p>
                  <strong>Name:</strong>{" "}
                  {`${propertyDetail.agentId.firstname || ""} ${propertyDetail.agentId.lastname || ""}`.trim() || "Not specified"}
                </p>
                <p>
                  <strong>Phone:</strong> {propertyDetail.agentId.phoneNumber || "Not specified"}
                </p>
                <p>
                  <strong>Email:</strong> {propertyDetail.agentId.email || "Not specified"}
                </p>
                <p>
                  <strong>Location:</strong> {propertyDetail.agentId.location || "Not specified"}
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
