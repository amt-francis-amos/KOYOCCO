import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const role = localStorage.getItem("role");

        if (!token) {
          navigate("/login");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get("/api/user/profile", config);
        setUserData(userResponse.data);

        if (role === "Customer") {
          const bookingResponse = await axios.get("/api/user/bookings", config);
          setBookings(bookingResponse.data);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="dashboard">
      <h1>Welcome, {userData.firstname}!</h1>
      <p>Role: {userData.role}</p>
      <p>Location: {userData.location}</p>

      {userData.role === "Customer" && (
        <div>
          <h2>Your Bookings</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                {booking.propertyName} - {booking.date}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
