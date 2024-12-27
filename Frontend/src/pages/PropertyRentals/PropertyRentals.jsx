import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyRentals = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingMessage, setBookingMessage] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    date: "",
  });
  const [userBooking, setUserBooking] = useState(null); // Store user booking info
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const { data } = await axios.get(
          "https://koyocco-backend.onrender.com/api/properties"
        );
        setProperties(data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch properties"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Check if the user has an existing booking for the selected property
  const checkUserBooking = async (propertyId) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://koyocco-backend.onrender.com/api/bookings/user/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setUserBooking(response.data); // User has already booked this property
      } else {
        setUserBooking(null); // No booking found
      }
    } catch (error) {
      console.error("Error checking user booking:", error);
      setUserBooking(null); // Error or no booking
    }
  };

  const handleBooking = async (property) => {
    const token = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const fullName = localStorage.getItem("userFullName");
    const email = localStorage.getItem("userEmail");

    setSelectedProperty(property);
    setFormData({
      fullName,
      email,
      phoneNumber: "",
      date: new Date().toISOString(),
    });

    // Check if the user has already booked this property
    await checkUserBooking(property._id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, date } = formData;
    const propertyId = selectedProperty._id;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/bookings",
        {
          propertyId,
          fullName,
          email,
          phoneNumber,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message) {
        setBookingMessage(`Successfully booked ${selectedProperty.name}!`);
        setSelectedProperty(null); // Clear the selected property after booking
      } else {
        setBookingMessage(
          "Booking response is empty. Please check the server response."
        );
      }
    } catch (error) {
      console.error("Booking error:", error);
      setBookingMessage(
        error.response?.data?.message || "Booking failed. Please try again."
      );
    }
  };

  const handleCancelBooking = async () => {
    const propertyId = selectedProperty._id;
    const bookingId = userBooking._id;

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://koyocco-backend.onrender.com/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.message) {
        setBookingMessage(
          `Successfully canceled your booking for ${selectedProperty.name}`
        );
        setUserBooking(null); // Clear user booking after cancellation
      } else {
        setBookingMessage(
          "Error while canceling the booking. Please try again."
        );
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      setBookingMessage("Canceling booking failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p className="text-center py-4">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-[1200px] mx-auto py-6 sm:py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Property Rentals</h1>

      {bookingMessage && (
        <p className="text-center py-2 text-green-500">{bookingMessage}</p>
      )}

      {selectedProperty ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{`Booking for ${selectedProperty.name}`}</h2>
          {userBooking ? (
            <div>
              <p>
                You have already booked this property on {userBooking.date}.
              </p>
              <button
                onClick={handleCancelBooking}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
              >
                Cancel Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Renting Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
              >
                Confirm Renting
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 p-4 flex flex-col"
            >
              <img
                src={
                  property.photos && property.photos.length > 0
                    ? property.photos[0]
                    : "default-image-url"
                }
                alt={property.name}
                className="w-full h-48 sm:h-60 object-cover mb-4"
              />

              <div className="flex-grow">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  {property.name}
                </h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 font-bold text-lg mt-1">
                  ${property.price}
                </p>
              </div>
              <button
                onClick={() => handleBooking(property)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-black transition duration-300"
              >
                Rent Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyRentals;
