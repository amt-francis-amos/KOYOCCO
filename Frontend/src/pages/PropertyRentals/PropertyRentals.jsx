import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyRentals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get('https://koyocco-backend.onrender.com/api/properties');
        setProperties(data);
      } catch (error) {
        setError(error.response?.data?.message || error.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleContact = (property) => {
    setSelectedProperty(property);
    setFormData({
      fullName: '',
      email: '',
      message: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, message } = formData;
  
    const contactData = {
      agentId: selectedProperty.agentId, 
      agentEmail: selectedProperty.agentEmail, // Fallback for agentEmail
      propertyId: selectedProperty._id,
      userName: fullName,
      userEmail: email,
      message: message,
    };
  
    console.log('Form data being sent:', contactData);
  
    try {
      const response = await axios.post('https://koyocco-backend.onrender.com/api/contact-agent', contactData);
  
      setContactMessage(`Your message has been sent to the agent for ${selectedProperty.name}.`);
      setSelectedProperty(null);
    } catch (error) {
      console.error('Contact error:', error.response?.data?.message || error.message);
      setContactMessage('Failed to send message. Please try again.');
    }
  };
  

  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Property Rentals</h1>

      {contactMessage && (
        <p className="text-center py-2 text-green-500">{contactMessage}</p>
      )}

      {selectedProperty ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{`Contact Agent for ${selectedProperty.name}`}</h2>
          <form onSubmit={handleContactSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
            >
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-48 sm:h-60 object-cover mb-4"
              />
              <div className="flex-grow">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">{property.name}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 font-bold text-lg mt-1">${property.price}</p>
              </div>
              <button
                onClick={() => handleContact(property)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
              >
                Contact Agent
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyRentals;
