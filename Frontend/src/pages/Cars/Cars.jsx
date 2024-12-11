import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { carListings } from '../../assets/assets';  
import {Link} from 'react-router-dom'

const Cars = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://koyocco-backend.onrender.com/api/requests');
            setRequests(response.data);
        } catch (error) {
            setError('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

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
            fetchRequests(); 
            alert(`Airport Pickup Request Submitted: ${response.data.message}`);
        } catch (error) {
            console.error('Error submitting request:', error);
            setError('Failed to submit airport pickup request.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();  
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Cars and Relocation Services</h1>
            
         
            <h2 className="text-2xl font-bold mt-8 mb-4">Airport Pickup</h2>
            <p className="text-gray-600 mb-6">
                Book a car for airport pickup as part of your accommodation package.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carListings.map(car => (
                    <div key={car.id} className="bg-white shadow-lg rounded-lg p-4">
                        <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                        <p className="text-gray-700 mb-4">{car.description}</p>
                        {/* <p className="text-gray-900 font-semibold mb-4">{`Price: $${car.price}`}</p> */}
                        <Link to='/create-request'
                            onClick={() => handleRequestAirportPickup(car)}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black"
                        >
                            Request Airport Pickup
                        </Link>
                    </div>
                ))}
            </div>

       
            <h2 className="text-2xl text-center font-bold mt-8 mb-4">Your Requests</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex gap-4 space-y-4 my-10">
                {requests.map((request, index) => (
                    <div key={index} className=" bg-white md:w-1/2 shadow-md p-6 rounded-lg">
                        <h3 className="text-xl font-semibold">{request.userName}</h3>
                        <p className="text-gray-600">{request.serviceType}</p>
                        <p className="text-gray-600">Location: {request.location}</p>
                        <p className="text-gray-600">Date: {new Date(request.date).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cars;
