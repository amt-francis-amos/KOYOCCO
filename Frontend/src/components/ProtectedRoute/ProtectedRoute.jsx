import React from 'react';
import { Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode'; // Correct import for named export

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    console.warn('Token is missing. Redirecting to login.');
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    const userRole = decodedToken.role;

    if (requiredRole && userRole !== requiredRole) {
      console.warn('User role mismatch. Redirecting to unauthorized page.');
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    console.error('Invalid or expired token. Redirecting to login.', error);
    localStorage.removeItem('authToken'); // Clear the invalid token
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
