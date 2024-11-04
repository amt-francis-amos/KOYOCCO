import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import ContactAgentModal from '../../components/Modals/ContactAgentModal';

const PropertyDetails = () => {
  const { id } = useParams(); 

  const [property, setProperty] = useState(null); // Initialize property state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch property details using the id from the URL
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://koyocco-backend.onrender.com/api/properties/${id}`);
        setProperty(response.data); // Set the fetched property
      } catch (err) {
        setError(err.message); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Only run effect when id changes

  const handleContactAgentClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle loading state and error display
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-[600px] mx-auto my-12">
      {property ? (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          {/* Displaying images */}
          <div className="w-full h-64 overflow-hidden">
            {property.images.length > 0 ? (
              <img src={`https://koyocco-backend.onrender.com/api/properties/${property.images[0]}`} alt={property.title} className="w-full h-full object-cover" />
            ) : (
              <p>No image available.</p>
            )}
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{property.location}</p>
            <p className="text-xl font-semibold text-red-600 mb-4">${property.price}</p>
            <p className="text-gray-800 mb-4">{property.description || "No description available."}</p>
            <button 
              onClick={handleContactAgentClick} 
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              Contact Agent
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Property not found</p>
      )}

      {/* Modal for contacting the agent */}
      {isModalOpen && (
        <ContactAgentModal 
          agent={agent} 
          onClose={closeModal} 
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default PropertyDetails;
