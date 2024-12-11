import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import { carListings } from '../../assets/assets';

const Cars = () => {
    // State to manage requests and errors
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequestAirportPickup = async (car) => {
        try {
            setLoading(true);
            setError(null);
            const requestData = {
                userName: "Sample User",
                userEmail: "user@example.com",
                serviceType: "Airport Pickup",
                vehicleId: car.id,
                date: new Date().toISOString(),
                location: car.location,
            };
            const response = await axios.post('https://koyocco-backend.onrender.com/api/requests/create', requestData);
            setRequests((prevRequests) => [...prevRequests, response.data]);
            alert(`Airport Pickup Request Submitted: ${response.data.message}`);
        } catch (error) {
            console.error('Error submitting request:', error);
            setError('Failed to submit airport pickup request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Cars and Relocation Services</h1>
            
            {/* Airport Pickup Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Airport Pickup</h2>
            <p className="text-gray-600 mb-6">
                Book a car for airport pickup as part of your accommodation package.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carListings.map(car => (
                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{car.name}</h2>
                            <p className="text-gray-600">Location: {car.location}</p>
                            <p className="text-lg font-bold mt-2">Price: {car.price}</p>
                            {/* Link to CreateRequest */}
                            <Link
                                to="/create-request" // Path to CreateRequest page
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-black inline-block"
                            >
                                Request Airport Pickup
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Relocation Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Relocation Services</h2>
            <p className="text-gray-600 mb-6">
                Need to relocate? Request trucks to move goods or logistics to new locations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['Truck 1', 'Truck 2', 'Truck 3'].map((truck, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={`https://via.placeholder.com/400?text=${truck}`} alt={truck} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{truck}</h2>
                            <p className="text-gray-600">Driver License Verified</p>
                            <p className="text-lg font-bold mt-2">Contact for Price</p>
                           
                            <Link
                                to="/create-request" // Path to CreateRequest page
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-black inline-block"
                            >
                                Request Relocation
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cars;
