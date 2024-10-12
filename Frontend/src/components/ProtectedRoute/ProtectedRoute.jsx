
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('authToken');


  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
