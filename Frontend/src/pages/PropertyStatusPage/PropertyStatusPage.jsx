import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      });
  }, []);

  const handleStatusUpdate = (propertyId) => {
    if (!status) {
      alert('Please select a status.');
      return;
    }

    axios.put(`https://koyocco-backend.onrender.com/api/properties${propertyId}`, { status })
      .then(response => {
        setProperties((prevProps) =>
          prevProps.map((property) =>
            property._id === propertyId ? { ...property, status } : property
          )
        );
        setSelectedProperty(null);
        setStatus(''); 
        alert('Property status updated successfully!');
      })
      .catch(error => {
        console.error('Error updating status:', error);
        alert('Failed to update property status');
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Update Property Status</h1>
      {Array.isArray(properties) && properties.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2">Property Name</th>
              <th className="px-6 py-3 border-b-2">Current Status</th>
              <th className="px-6 py-3 border-b-2">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td className="px-6 py-4 border-b">{property.name}</td>
                <td className="px-6 py-4 border-b">{property.status}</td>
                <td className="px-6 py-4 border-b">
                  <select
                    value={selectedProperty === property._id ? status : ''}
                    onChange={(e) => {
                      setSelectedProperty(property._id);
                      setStatus(e.target.value);
                    }}
                    className="border border-gray-300 rounded p-2"
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
                    className="ml-4 bg-red-500 hover:bg-black text-white font-bold py-2 px-4 rounded"
                    disabled={!status || selectedProperty !== property._id}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default PropertyStatusPage;
