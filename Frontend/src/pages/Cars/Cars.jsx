import React, { useState, useEffect } from "react";
import axios from "axios";
import { carListings } from "../../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Cars = () => {
    // State variables
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);

    // Function to fetch requests
    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://koyocco-backend.onrender.com/api/requests");
            setRequests(response.data);
        } catch (error) {
            console.error("Error fetching requests:", error);
            setError("Failed to load requests.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle request submission
    const handleRequestAirportPickup = async (car) => {
        try {
            setLoading(true);
            setError(null);

            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) {
                setError("User not authenticated");
                return;
            }

            const requestData = {
                userName: user.name,
                userEmail: user.email,
                serviceType: "Airport Pickup",
                vehicleId: car.id,
                date: new Date().toISOString(),
                location: car.location,
            };

            const response = await axios.post(
                "https://koyocco-backend.onrender.com/api/requests/create",
                requestData
            );

            console.log("Server Response:", response.data);
            fetchRequests();
            alert(`Airport Pickup Request Submitted: ${response.data.message}`);
        } catch (error) {
            console.error("Error submitting request:", error.response ? error.response.data : error.message);
            setError("Failed to submit airport pickup request.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle file uploads
    const handleFileUpload = async (file) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", file);

            const response = await axios.post(
                "https://koyocco-backend.onrender.com/api/requests/upload",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            console.log("Upload Success:", response.data);
            alert(`Image Uploaded Successfully: ${response.data.message}`);
        } catch (error) {
            console.error("Error uploading image:", error);
            setError("Failed to upload image.");
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

            {loading && <p className="text-center text-blue-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carListings.map((car) => (
                    <div key={car.id} className="bg-white shadow-lg rounded-lg p-7">
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                        <p className="text-gray-700 mb-4">{car.description}</p>

                        <Link
                            to="/create-request"
                            onClick={() => handleRequestAirportPickup(car)}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-black"
                        >
                            Request Relocation
                        </Link>

                        {/* File Upload */}
                        <input
                            type="file"
                            className="mt-4"
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                        />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Cars;
