import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Booking = () => {
  const location = useLocation();
  const { name, price, location: stayLocation, id } = location.state;

  const [fullName, setFullName] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Add phoneNumber state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const exchangeRate = 10;

  const convertToGHS = (priceInUSD) => {
    const price = parseFloat(priceInUSD.replace(/[^0-9.-]+/g, ""));
    if (isNaN(price)) {
      return "Invalid Price";
    }
    return `₵ ${(price * exchangeRate).toLocaleString()}`;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    if (!fullName || !email || !date || !phoneNumber) { // Validate phoneNumber
      setError("All fields are required");
      return;
    }
  
    try {
      const bookingData = {
        propertyId: id, // Use id directly instead of state
        fullName,
        email,
        phoneNumber, // Include phoneNumber in the request
        date,
      };
  
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/bookings",
        bookingData,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("authToken") },
        }
      );
  
      if (response.status === 201) {
        setSuccess("Booking confirmed! Check your email for confirmation.");
        setFullName("");
        setEmail("");
        setPhoneNumber(""); // Reset phoneNumber input
        setDate("");
      } else {
        setError("Unexpected response from the server. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Error creating booking. Please try again.");
      } else {
        setError("Error creating booking. Please try again.");
      }
      console.error(err);
    }
  };
  

  return (
    <div className="max-w-[800px] mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Book Your Stay</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-4">Stay: {name}</h2>
        <p className="text-gray-600 mb-2">Location: {stayLocation}</p>
        <p className="text-gray-800 font-bold mb-4">Price: {convertToGHS(price)}</p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleBooking}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Your Phone Number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Booking Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-black"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
