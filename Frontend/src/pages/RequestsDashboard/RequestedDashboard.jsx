import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://koyocco-backend.onrender.com/api/requests"
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Relocation Requests
      </h1>

      {/* Card Container */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {request.userName}
            </h2>
            <p className="text-sm text-gray-600">{request.userEmail}</p>

            <div className="mt-2 text-sm text-gray-700">
              
              <p>
                <strong>Date:</strong>{" "}
                {new Date(request.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Region:</strong> {request.region}
              </p>
              <p>
                <strong>Registration No.:</strong> {request.registrationNumber}
              </p>
              <p>
                <strong>Driver's Contact:</strong> {request.driverContact}
              </p>
            </div>

            {/* Car Images */}
            {request.carImages && request.carImages.length > 0 ? (
              <div className="mt-3">
                <p className="text-sm font-semibold">Car Images:</p>
                <div className="flex gap-2 overflow-x-auto">
                  {request.carImages.map((img, index) => (
                    <a href={img} target="_blank" rel="noopener noreferrer" key={index}>
                      <img
                        src={img}
                        alt={`Car ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-md border border-gray-300"
                      />
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 mt-2">No Images Available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsDashboard;
