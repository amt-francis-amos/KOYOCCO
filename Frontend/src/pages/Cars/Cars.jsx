import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('https://koyocco-backend.onrender.com/api/requests');
            setCars(response.data);
        } catch (error) {
            setError('Failed to load car listings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container mx-auto p-4"
        >
            {/* Call-to-Action Section */}
            <div className="relative bg-cover bg-center text-white py-20 px-6 rounded-lg" 
                style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?car,road')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <div className="relative text-center z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Need a Relocation Service?</h2>
                    <p className="text-lg md:text-xl mb-6">
                        Easily request a car for relocation as part of your accommodation package.
                    </p>
                    <Link 
                        to="/create-request" 
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg text-lg shadow-lg transition duration-300"
                    >
                        Create a Request
                    </Link>
                </div>
            </div>

            {/* Car Listings Section */}
            <h1 className="text-2xl md:text-4xl font-bold mt-16 mb-4 text-center">
                Available Cars & Relocation Services
            </h1>

            <p className="text-gray-600 mb-6 text-center">
                Browse available cars for your relocation needs.
            </p>

            {loading && <p className="text-center">Loading cars...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                    <Link 
                        to="/request-dashboard" 
                        key={car._id} 
                        className="bg-white shadow-lg rounded-lg p-7 hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer"
                    >
                        <img 
                            src={car.carImages[0]} 
                            alt={car.carType} 
                            className="w-full h-[40vh] object-cover rounded-lg mb-4" 
                        />
                        <h3 className="text-xl font-semibold mb-2">{car.carType}</h3>
                        <p className="text-gray-700 mb-2">Location: {car.location}</p>
                        <p className="text-gray-700 mb-2">Region: {car.region}</p>
                        <p className="text-gray-700 mb-2">Driver Contact: {car.driverContact}</p>
                        <p className="text-gray-700 mb-4">{car.description}</p>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default Cars;
