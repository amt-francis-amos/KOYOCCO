import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../../assets/koyocco-logo.jpeg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://koyocco.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, role } = response.data;
      console.log(role)

      if (!token || !role) {
        setMessage("Login failed: No token or role received");
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role); 

      const redirectPath =
        role === "Admin"
          ? "/adminDashboard"
          : role === "Property Owner"
          ? "/ownerDashboard"
          : role === "Agent"
          ? "/agentDashboard"
          : "/";

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate(redirectPath); // Redirect based on role
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-white shadow-md m-[60px] rounded-lg p-8 max-w-md w-full mx-auto">
      <ToastContainer />
      <img
        src={bgImage}
        alt="Logo"
        className="mx-auto mb-6"
        style={{ width: "80px", height: "80px" }}
      />
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
      <div className="mt-4">
        <Link to="/forgot-password" className="text-gray-900 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
