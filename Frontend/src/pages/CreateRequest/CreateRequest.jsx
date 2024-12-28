import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import React Toastify

const CreateRequest = () => {
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        phone: '',
        serviceType: 'airport-pickup',
        details: '',
        vehicleId: '',
        date: '',
        location: '',
        agentEmail: '', // Add agentEmail here
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Set submitting state to true
        console.log('Sending request with data:', formData);

        const { userName, userEmail, phone, serviceType, vehicleId, date, location, agentEmail } = formData;
        if (!userName || !userEmail || !phone || !serviceType || !vehicleId || !date || !location || !agentEmail) {
            toast.error('Please fill in all fields.');
            setIsSubmitting(false); // Reset submitting state
            return;
        }

        try {
            // Send request to the backend
            const response = await axios.post('https://koyocco-backend.onrender.com/api/requests/create', formData);

            if (response.status === 201) {
                // Notify the user and agent by email on success
                await axios.post('https://koyocco-backend.onrender.com/api/requests/send-emails', {
                    userEmail,
                    agentEmail, // Send agentEmail from form data
                    userName,
                    serviceType,
                    vehicleId,
                    date,
                    location,
                });

                // Show success notification
                toast.success('Request submitted successfully!');
                setFormData({
                    userName: '',
                    userEmail: '',
                    phone: '',
                    serviceType: 'airport-pickup',
                    details: '',
                    vehicleId: '',
                    date: '',
                    location: '',
                    agentEmail: '', // Reset agentEmail after submission
                });

                // Redirect to the Cars page after successful submission
                navigate('/cars'); // Replace with the correct path to your Cars page
            } else {
                toast.error('Failed to submit request.');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            toast.error('An error occurred while submitting the request.');
        } finally {
            setIsSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Create a Request</h1>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
                {/* Full Name */}
                <div className="mb-4">
                    <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Email Address */}
                <div className="mb-4">
                    <label htmlFor="userEmail" className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="userEmail"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Request Type */}
                <div className="mb-4">
                    <label htmlFor="serviceType" className="block text-gray-700 font-bold mb-2">
                        Request Type
                    </label>
                    <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="airport-pickup">Airport Pickup</option>
                        <option value="relocation-service">Relocation Service</option>
                    </select>
                </div>

                {/* Vehicle ID */}
                <div className="mb-4">
                    <label htmlFor="vehicleId" className="block text-gray-700 font-bold mb-2">
                        Vehicle ID
                    </label>
                    <input
                        type="text"
                        id="vehicleId"
                        name="vehicleId"
                        value={formData.vehicleId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Date */}
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Location */}
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Additional Details */}
                <div className="mb-4">
                    <label htmlFor="details" className="block text-gray-700 font-bold mb-2">
                        Additional Details
                    </label>
                    <textarea
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                </div>

                {/* Agent Email */}
                <div className="mb-4">
                    <label htmlFor="agentEmail" className="block text-gray-700 font-bold mb-2">
                        Agent Email
                    </label>
                    <input
                        type="email"
                        id="agentEmail"
                        name="agentEmail"
                        value={formData.agentEmail}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting} // Disable button while submitting
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
