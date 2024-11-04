import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyDetails = () => {
    const { id } = useParams(); // Get the property ID from the URL
    const [propertyDetail, setPropertyDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            try {
                const response = await axios.get(`https://koyocco-backend.onrender.com/api/properties/${id}`);
                setPropertyDetail(response.data); // Set the property details including agent info
            } catch (error) {
                console.error('Error fetching property details:', error);
                setError('Failed to load property details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetail();
    }, [id]);

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center">{error}</p>;
    if (!propertyDetail) return <p className="text-center">Property not found.</p>;

    const agent = propertyDetail.agent || {}; // Access agent details safely

    return (
        <div className="container mx-auto my-8 px-4">
            <h2 className="text-3xl font-bold mb-4">{propertyDetail.name}</h2>
            <img src={propertyDetail.images[0]} alt={propertyDetail.name} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{propertyDetail.description}</p>
            <p className="text-red-500 font-bold text-lg">${propertyDetail.price}</p>
            <p className="text-gray-500 mb-4">{propertyDetail.location}</p>
            
            {/* Agent Details Section */}
            <div className="border-t mt-6 pt-4">
                <h3 className="text-xl font-bold">Agent Details</h3>
                <div className="flex items-center mt-4">
                    {agent.profilePicture ? (
                        <img src={agent.profilePicture} alt={agent.name} className="w-16 h-16 rounded-full mr-4" />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
                    )}
                    <div>
                        <p className="font-bold">{agent.name || 'Unknown Agent'}</p>
                        <p className="text-gray-600">Email: {agent.email || 'N/A'}</p>
                        <p className="text-gray-600">Phone: {agent.phone || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
