import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRequest = () => {
    const [formData, setFormData] = useState({
        userName: '',
        phone: '',
        serviceType: 'airport-pickup',
        details: '',
        date: '',
        location: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { userName, phone, serviceType, date, location } = formData;
        if (!userName || !phone || !serviceType || !date || !location) {
            toast.error('Please fill in all required fields.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                'https://koyocco-backend.onrender.com/api/requests/create',
                formData
            );

            if (response.status === 201) {
                toast.success('Request submitted successfully!');
                setFormData({
                    userName: '',
                    phone: '',
                    serviceType: 'airport-pickup',
                    details: '',
                    date: '',
                    location: '',
                });

               
                setTimeout(() => navigate('/cars'), 1000);
            } else {
                toast.error('Failed to submit the request.');
            }
        } catch (error) {
            console.error('Error submitting request:', error);
            toast.error(
                error.response?.data?.message || 'An error occurred while submitting the request.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Create a Request</h1>
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
            >
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
                        pattern="[0-9]{10}" // Validates a 10-digit phone number
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
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
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg text-white ${
                        isSubmitting ? 'bg-green-800' : 'bg-red-500 hover:bg-black'
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
