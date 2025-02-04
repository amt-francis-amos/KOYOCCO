import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Relocation Requests</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Name</th>
            <th className="p-2 border-b">Email</th>
            <th className="p-2 border-b">Service Type</th>
            <th className="p-2 border-b">Date</th>
            <th className="p-2 border-b">Region</th>
            <th className="p-2 border-b">Registration No.</th>
            <th className="p-2 border-b">Driver's Contact</th>
          
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td className="p-2 border-b">{request.userName}</td>
              <td className="p-2 border-b">{request.userEmail}</td>
              <td className="p-2 border-b">{request.serviceType}</td>
              <td className="p-2 border-b">{request.date}</td>
              <td className="p-2 border-b">{request.region}</td>
              <td className="p-2 border-b">{request.registrationNumber}</td>
              <td className="p-2 border-b">{request.driverContact}</td>
              
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsDashboard;
