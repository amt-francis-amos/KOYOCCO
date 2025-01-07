import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./pages/Admin/Dashboard"; // Import the Admin Dashboard
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token exists in localStorage and is valid
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Validate token with the backend (you may want to add a refresh token system here)
      axios
        .get("https://koyocco-backend.onrender.com/api/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setIsAuthenticated(false);
          localStorage.removeItem("token");
        });
    }
  }, []);

  return (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Protected Route: Admin Dashboard */}
          <Route
            path="/admin-dashboard"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace /> // Redirect to login if not authenticated
              )
            }
          />
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
