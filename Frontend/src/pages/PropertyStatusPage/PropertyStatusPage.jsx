import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyStatusPage = () => {
  const [properties, setProperties] = useState([]);
  const [status, setStatus] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    axios.get('https://koyocco-backend.onrender.com/api/properties')
      .then(response => {
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          setProperties([]);
        }
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        toast.error('Failed to fetch properties');
      });
  }, []);

  const handleStatusUpdate = (propertyId) => {
    if (!status) {
      toast.warning('Please select a status.');
      return;
    }

    // Corrected PUT request URL with a '/' before the property ID
    axios.put(`https://koyocco-backend.onrender.com/api/properties/${propertyId}/status`, { status })
      .then(response => {
        setProperties((prevProps) =>
          prevProps.map((property) =>
            property._id === propertyId ? { ...property, status } : property
          )
        );
        setSelectedProperty(null);
        setStatus('');
        toast.success('Property status updated successfully!');
      })
      .catch(error => {
        console.error('Error updating status:', error);
        toast.error('Failed to update property status');
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Update Property Status</h1>
      {Array.isArray(properties) && properties.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b-2 text-left">Property Name</th>
                <th className="px-4 py-3 border-b-2 text-left">Current Status</th>
                <th className="px-4 py-3 border-b-2 text-left">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td className="px-4 py-4 border-b text-sm">{property.name}</td>
                  <td className={`px-4 py-4 border-b text-sm ${property.status === 'Rented' ? 'text-blue-500' : ''}`}>
                    {property.status}
                  </td>
                  <td className="px-4 py-4 border-b text-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center">
                      <select
                        value={selectedProperty === property._id ? status : ''}
                        onChange={(e) => {
                          setSelectedProperty(property._id);
                          setStatus(e.target.value);
                        }}
                        className="border border-gray-300 rounded p-2 mb-2 sm:mb-0 sm:mr-4 w-full sm:w-auto"
                      >
                        <option value="" disabled>
                          Select status
                        </option>
                        <option value="Available">Available</option>
                        <option value="Sold">Sold</option>
                        <option value="Rented">Rented</option>
                      </select>
                      <button
                        onClick={() => handleStatusUpdate(property._id)}
                        className="ml-4 bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
                        disabled={!status || selectedProperty !== property._id}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No properties found.</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default PropertyStatusPage;
