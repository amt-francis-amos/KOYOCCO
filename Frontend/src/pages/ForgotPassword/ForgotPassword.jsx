import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        "https://koyocco-frontend.onrender.com/api/auth/forgot-password",
        {
          email,
        }
      );

      setMessage(
        response.data.message || "Password reset email sent successfully."
      );
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.status === 400) {
        setError(
          "Invalid email. Please check the email address and try again."
        );
      } else if (error.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md m-[60px] rounded-lg p-8 max-w-md w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-black"
        >
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
