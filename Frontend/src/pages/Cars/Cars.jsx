import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://koyocco-backend.onrender.com/api/requests"
      );
      setCars(response.data);
    } catch (error) {
      setError("Failed to load car listings");
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
      <div
        className="relative bg-cover bg-center text-white py-20 px-6 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?car,road')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
        <div className="relative text-center z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Need a Relocation Service?
          </h2>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {cars.map((car) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <Link to="/request-dashboard">
              <div className="relative h-56">
                <img
                  src={car.carImages[0]}
                  alt={car.carType}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-lg font-semibold">
                  {car.carType}
                </h3>
              </div>

              <div className="p-4">
                <p className="text-gray-600">
                  <span className="font-medium">Location:</span> {car.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Region:</span> {car.region}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Driver Contact:</span> {car.driverContact}
                </p>
                <p className="text-gray-700 mt-2 text-sm">{car.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Cars;
