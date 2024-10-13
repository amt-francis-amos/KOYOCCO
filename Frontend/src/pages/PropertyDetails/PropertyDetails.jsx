import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFeaturedProperties } from '../../context/FeaturedPropertiesContext';
import axios from 'axios'; 
import ContactAgentModal from '../../components/Modals/ContactAgentModal';

const PropertyDetails = () => {
  const { id } = useParams(); 
  const { featuredProperties } = useFeaturedProperties();
  const property = featuredProperties.find((property) => property.id === Number(id));
  
  // State to manage modal visibility and agent details
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch agent details when the property is available
  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!property) return;

      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`https://koyocco-backend.onrender.com/api/properties/${property.id}/agent`); // Use Axios to fetch data
        setAgent(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message); // Handle error gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [property]);

  const handleContactAgentClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-[600px] mx-auto my-12">
      {property ? (
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg">
          <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-gray-600 text-lg mb-4">{property.location}</p>
            <p className="text-xl font-semibold text-red-600 mb-4">{property.price}</p>
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
