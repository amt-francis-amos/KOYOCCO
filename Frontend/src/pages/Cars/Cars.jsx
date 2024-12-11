import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { carListings } from '../../assets/assets';

const Cars = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch requests when component mounts
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://koyocco-backend.onrender.com/api/requests');
                setRequests(response.data); // Update state with fetched requests
            } catch (err) {
                console.error('Error fetching requests:', err);
                setError('Failed to load requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

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
        } catch (err) {
            console.error('Error submitting request:', err);
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
                {carListings.map((car) => (
                    <div key={car.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{car.name}</h2>
                            <p className="text-gray-600">Location: {car.location}</p>
                            <p className="text-lg font-bold mt-2">Price: {car.price}</p>
                            <button
                                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-black"
                                onClick={() => handleRequestAirportPickup(car)}
                            >
                                Request Airport Pickup
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Display Requests */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Your Requests</h2>
            {loading && <p>Loading requests...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {requests.length > 0 ? (
                <table className="table-auto w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Service Type</th>
                            <th className="px-4 py-2">Vehicle ID</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request.id}>
                                <td className="border px-4 py-2">{request.serviceType}</td>
                                <td className="border px-4 py-2">{request.vehicleId}</td>
                                <td className="border px-4 py-2">{new Date(request.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{request.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No requests made yet.</p>
            )}
        </div>
    );
};

export default Cars;
