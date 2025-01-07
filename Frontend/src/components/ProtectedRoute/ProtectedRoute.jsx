import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // You can install this package: npm install jwt-decode

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // No token, redirect to login
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwt_decode(token);
    const userRole = decodedToken.role; // assuming the role is in the decoded token

    // If the user's role doesn't match the required role, redirect to a forbidden page or login
    if (userRole !== requiredRole) {
      return <Navigate to="/forbidden" replace />;
    }
  } catch (error) {
    // Handle any error related to token decoding
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
