// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Loginpage/Login';
import Signup from './pages/Signup/Signup';
import Footer from './components/Footer/Footer';
import AboutPage from './pages/About/AboutPage';
import UploadProperty from './pages/Upload/UploadProperty';
import PropertyList from './pages/PropertyList/PropertyList';
import ShortStays from './pages/ShortStay/ShortStays';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import OwnerDashboard from './pages/PropertyOwner/OwnerDashboard';
import AgentDashboard from './pages/AgentDashboard/AgentDashboard';
import PropertyDetails from './pages/PropertyDetails/PropertyDetails';
import { FeaturedPropertiesProvider } from './context/FeaturedPropertiesContext'; 
import Booking from './pages/Booking/Booking';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  const role = localStorage.getItem('role'); // Get user role from local storage

  return (
    <FeaturedPropertiesProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route 
          path='/adminDashboard' 
          element={
            <ProtectedRoute role={role}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/ownerDashboard' 
          element={
            <ProtectedRoute role={role}>
              <OwnerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/agentDashboard' 
          element={
            <ProtectedRoute role={role}>
              <AgentDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/short-stays' element={<ShortStays />} />
        <Route path='/booking' element={<Booking />} />
        <Route path='/uploadProperty' element={<UploadProperty />} />
        <Route path='/propertyList' element={<PropertyList />} />
        <Route path='/property/:id' element={<PropertyDetails />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </FeaturedPropertiesProvider>
  );
}

export default App;
