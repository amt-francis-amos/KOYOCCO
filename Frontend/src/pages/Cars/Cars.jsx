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
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center mt-10">
                Cars and Relocation Services
            </h1>

            <p className="text-gray-600 mb-6 text-center">
                Book a car for Relocation as part of your accommodation package.
            </p>

            {loading && <p className="text-center">Loading cars...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                    <div key={car._id} className="bg-white shadow-lg rounded-lg p-7">
                        <img 
                            src={car.carImages[0]} 
                            alt={car.carType} 
                            className="w-full h-40 object-cover rounded-lg mb-4" 
                        />
                        <h3 className="text-xl font-semibold mb-2">{car.carType}</h3>
                        <p className="text-gray-700 mb-2">Location: {car.location}</p>
                        <p className="text-gray-700 mb-2">Region: {car.region}</p>
                        <p className="text-gray-700 mb-2">Driver Contact: {car.driverContact}</p>
                        <p className="text-gray-700 mb-4">{car.description}</p>

                        <Link 
                            to='/create-request'
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black text-center block"
                        >
                            Request Relocation
                        </Link>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Cars;
