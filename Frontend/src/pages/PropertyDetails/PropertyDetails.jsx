import React from "react";
import { useParams } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";

const PropertyDetails = () => {
  const { id } = useParams(); 
  const { property } = useProperty(); 
  const propertyDetail = property.find((prop) => prop._id === id); 

  if (!propertyDetail) {
    return <p className="text-center">Property not found.</p>; 
  }

  return (
    <div className="container mx-auto my-8 px-4 flex flex-col md:flex-row gap-8">
      {/* Left: Property Image */}
      <div className="w-full md:w-1/2">
        <img
          src={propertyDetail.images[0]}
          alt={propertyDetail.name}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Right: Property Details */}
      <div className="w-full md:w-1/2 flex flex-col space-y-4">
        <h2 className="text-3xl font-bold">{propertyDetail.name}</h2>
        <p className="text-gray-600">{propertyDetail.description}</p>
        <p className="text-red-500 font-bold text-lg">
          ₵{propertyDetail.price.toLocaleString()}
        </p>
        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div>
            <span className="font-medium">Region:</span>
            <p>{propertyDetail.region}</p>
          </div>
          <div>
            <span className="font-medium">Address:</span>
            <p>{propertyDetail.address}</p>
          </div>
          <div>
            <span className="font-medium">Condition:</span>
            <p>{propertyDetail.condition}</p>
          </div>
          <div>
            <span className="font-medium">Status:</span>
            <p
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
            </p>
          </div>
        </div>
        <p className="text-gray-500">
          <span className="font-medium">Property Type:</span>{" "}
          {propertyDetail.propertyType}
        </p>
      </div>
    </div>
  );
};

export default PropertyDetails;
