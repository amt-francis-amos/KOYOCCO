import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]); // State to store users
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

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

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://koyocco-backend.onrender.com/api/auth/login",
        { email, password }
      );

      const { token, role, users, bookings } = response.data;

      if (!token || !role) {
        setMessage("Login failed: No token or role received");
        return;
      }

      // Store the token and role in localStorage for persistence
      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);

      setIsAuthenticated(true);

      // If the role is Admin, store the users in state
      if (role === "Admin") {
        setUsers(users);
      }

      // Redirect the user to the appropriate dashboard based on their role
      const redirectPath =
        role === "Admin"
          ? "/adminDashboard"
          : role === "Property Owner"
          ? "/ownerDashboard"
          : role === "Agent"
          ? "/agentDashboard"
          : "/"; // Redirect to home if no matching role

      toast.success("Login successful!");
      navigate(redirectPath);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="bg-white shadow-md m-[60px] rounded-lg p-8 max-w-md w-full mx-auto">
      <ToastContainer />
      <img
        src={assets.koyoccoLogo}
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
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <span
            className="absolute right-3 top-10 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} 
          </span>
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

      {!isAuthenticated && (
        <div className="flex justify-between mt-4 ">
          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline">
            Forgot your password?
          </Link>
          <Link to="/signup" className="text-gray-900 text-sm hover:underline">
            Don't have an account? Signup
          </Link>
        </div>
      )}

      {/* If logged in as admin, display the list of users */}
      {isAuthenticated && users.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Users List</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id} className="mb-4">
                <div className="p-4 border rounded-lg">
                  <p className="font-semibold">Name: {user.firstname} {user.lastname}</p>
                  <p>Email: {user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
