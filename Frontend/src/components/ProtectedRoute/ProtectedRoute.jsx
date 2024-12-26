import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const storedRole = localStorage.getItem("role");
  

  if (!storedRole || storedRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
