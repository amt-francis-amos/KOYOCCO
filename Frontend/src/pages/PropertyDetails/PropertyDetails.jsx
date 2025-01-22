// PropertyDetails.js (Frontend)
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PropertyDetails = () => {
  const { id } = useParams(); // Get the property id from URL
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [agentContact, setAgentContact] = useState(null);
  const [agentForm, setAgentForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Handle form input changes
  const handleAgentChange = (e) => {
    setAgentForm({
      ...agentForm,
      [e.target.name]: e.target.value
    });
  };

  // Submit agent details to backend
  const handleAgentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://koyocco-backend.onrender.com/api/properties/${id}/agent`, agentForm);
      console.log('Agent details added:', response.data);
     
      fetchPropertyDetails();
    } catch (error) {
      console.error('Error posting agent details:', error.response?.data || error.message);
    }
  };

  // Fetch the property details
  const fetchPropertyDetails = async () => {
    try {
      const response = await axios.get(`https://koyocco-backend.onrender.com/api/properties/${id}`);
      console.log('Property details:', response.data);
      setPropertyDetail(response.data);
      if (response.data.agent) {
        setAgentContact(response.data.agent);
      }
    } catch (error) {
      console.error('Error fetching property details:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  return (
    <div className="container mx-auto my-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {propertyDetail ? propertyDetail.name : 'Loading...'}
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section */}
        <div className="md:w-1/2">
          <img
            src={propertyDetail ? propertyDetail.images[0] : ''}
            alt={propertyDetail ? propertyDetail.name : ''}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Right section with styling */}
        <div className="md:w-1/2 bg-white shadow-lg rounded-md p-6 flex flex-col justify-between">
          <div>
            <p className="text-gray-600 mb-4">{propertyDetail ? propertyDetail.description : ''}</p>
            <p className="text-red-500 font-bold text-lg mb-2">
              ₵{propertyDetail ? propertyDetail.price : ''}
            </p>
            <p className="text-gray-500 mb-4">{propertyDetail ? propertyDetail.location : ''}</p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Region:</strong> {propertyDetail ? propertyDetail.region : ''}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Condition:</strong> {propertyDetail ? propertyDetail.condition : ''}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Status:</strong>{" "}
              <span
                className={`${
                  propertyDetail && propertyDetail.status === "available"
                    ? "text-green-500"
                    : propertyDetail && propertyDetail.status === "rented"
                    ? "text-blue-500"
                    : "text-red-500"
                }`}
              >
                {propertyDetail ? propertyDetail.status.charAt(0).toUpperCase() + propertyDetail.status.slice(1) : ''}
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Type:</strong> {propertyDetail ? propertyDetail.propertyType : ''}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <button
              onClick={fetchPropertyDetails}
              className="bg-red-500 text-white px-6 py-2 hover:bg-black duration-300 rounded-full"
            >
              Refresh Property
            </button>
          </div>

          {/* Agent Form */}
          <form onSubmit={handleAgentSubmit} className="mt-6">
            <h3 className="text-lg font-bold mb-2">Add Agent Details</h3>
            <input
              type="text"
              name="name"
              value={agentForm.name}
              onChange={handleAgentChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Agent Name"
            />
            <input
              type="email"
              name="email"
              value={agentForm.email}
              onChange={handleAgentChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Agent Email"
            />
            <input
              type="text"
              name="phone"
              value={agentForm.phone}
              onChange={handleAgentChange}
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              placeholder="Agent Phone"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 hover:bg-blue-700 duration-300 rounded-full"
            >
              Submit Agent Details
            </button>
          </form>

          {/* Display agent contact details */}
          {agentContact && (
            <div className="mt-4 bg-gray-100 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold mb-2">Agent Contact Details</h3>
              <p className="text-gray-700 mb-1">
                <strong>Name:</strong> {agentContact.name}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Email:</strong> {agentContact.email}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {agentContact.phone}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
