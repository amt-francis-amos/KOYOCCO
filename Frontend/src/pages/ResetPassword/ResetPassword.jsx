import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (!token) {
      setMessage("Invalid or missing token. Please request a new password reset link.");
    }
  }, [token]);

 
  const validateForm = () => {
    const validationErrors = {};
    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match";
    }
    if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!validateForm()) {
      setMessage("Please fix the errors in the form");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `https://koyocco-backend.onrender.com/api/auth/reset-password/${token}`,
        { password }
      );

    
      setMessage(response.data.message || "Password reset successfully!");
      navigate("/login");

    } catch (error) {
      console.error("Reset password error:", error);
     
      if (error.response?.status === 400) {
        setMessage("Invalid or expired token. Please request a new password reset link.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md m-[60px] rounded-lg p-8 max-w-md w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
            disabled={isSubmitting}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
            disabled={isSubmitting}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
        <button
          type="submit"
          className={`bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-black ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </button>
      </form>
      {message && (
        <p className={`mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
