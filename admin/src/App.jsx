import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the token exists in localStorage and is valid
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally, you could validate the token here by sending it to the backend.
      // For now, we'll assume the token is valid if it exists.
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
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
