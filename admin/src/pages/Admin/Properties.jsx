import React from "react";

const Properties = () => {
  // Example properties data
  const properties = [
    { name: "Luxury Villa", location: "California", status: "Available" },
    { name: "Modern Apartment", location: "New York", status: "Sold" },
    { name: "Beachfront Property", location: "Florida", status: "Available" },
  ];

  return (
    <div className="container mx-auto space-y-6">
      <div className="bg-white w-[100%] h-[100vh] shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700">Properties</h2>
        <div className="mt-6 grid gap-6">
          {/* Header Row */}
          <div className="grid grid-cols-4 bg-gray-100 p-4 rounded-lg font-semibold text-gray-600">
            <div>Property Name</div>
            <div>Location</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          {/* Property Rows */}
          {properties.map((property, index) => (
            <div
              key={index}
              className="grid grid-cols-4 items-center bg-white p-4 shadow-sm rounded-lg hover:shadow-md transition-shadow"
            >
              <div>{property.name}</div>
              <div>{property.location}</div>
              <div className={`font-semibold ${property.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                {property.status}
              </div>
              <div className="space-x-4">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
