import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("https://koyocco-backend.onrender.com/api/requests");
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Relocation Requests
      </h1>

      {/* Table View for Larger Screens */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border-b text-sm sm:text-base">Name</th>
              <th className="p-2 border-b text-sm sm:text-base">Email</th>
              <th className="p-2 border-b text-sm sm:text-base">Service Type</th>
              <th className="p-2 border-b text-sm sm:text-base">Date</th>
              <th className="p-2 border-b text-sm sm:text-base">Region</th>
              <th className="p-2 border-b text-sm sm:text-base">Registration No.</th>
              <th className="p-2 border-b text-sm sm:text-base">Driver's Contact</th>
              <th className="p-2 border-b text-sm sm:text-base">Car Images</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="text-xs sm:text-sm">
                <td className="p-2 border-b">{request.userName}</td>
                <td className="p-2 border-b">{request.userEmail}</td>
                <td className="p-2 border-b">{request.serviceType}</td>
                <td className="p-2 border-b">{new Date(request.date).toLocaleDateString()}</td>
                <td className="p-2 border-b">{request.region}</td>
                <td className="p-2 border-b">{request.registrationNumber}</td>
                <td className="p-2 border-b">{request.driverContact}</td>
                <td className="p-2 border-b flex gap-2">
                  {request.carImages && request.carImages.length > 0 ? (
                    request.carImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Car ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs">No Images</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <p className="text-sm font-semibold">
              Name: <span className="font-normal">{request.userName}</span>
            </p>
            <p className="text-sm font-semibold">
              Email: <span className="font-normal">{request.userEmail}</span>
            </p>
            <p className="text-sm font-semibold">
              Service Type: <span className="font-normal">{request.serviceType}</span>
            </p>
            <p className="text-sm font-semibold">
              Date: <span className="font-normal">{new Date(request.date).toLocaleDateString()}</span>
            </p>
            <p className="text-sm font-semibold">
              Region: <span className="font-normal">{request.region}</span>
            </p>
            <p className="text-sm font-semibold">
              Registration No.: <span className="font-normal">{request.registrationNumber}</span>
            </p>
            <p className="text-sm font-semibold">
              Driver's Contact: <span className="font-normal">{request.driverContact}</span>
            </p>

            {/* Display Car Images */}
            <div className="mt-3">
              <p className="text-sm font-semibold">Car Images:</p>
              {request.carImages && request.carImages.length > 0 ? (
                <div className="flex gap-2 overflow-x-auto">
                  {request.carImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Car ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <span className="text-gray-500 text-xs">No Images</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsDashboard;
