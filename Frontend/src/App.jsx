import React from "react";
import { Routes, Route } from "react-router-dom";
import { PropertyProvider } from "./context/PropertyContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Loginpage/Login";
import Signup from "./pages/Signup/Signup";
import Footer from "./components/Footer/Footer";
import AboutPage from "./pages/About/AboutPage";
import UploadProperty from "./pages/Upload/UploadProperty";
import CreateRequest from "./pages/CreateRequest/CreateRequest";
import PropertyList from "./pages/PropertyList/PropertyList";
import ShortStays from "./pages/ShortStay/ShortStays";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import OwnerDashboard from "./pages/PropertyOwner/OwnerDashboard";
import AgentDashboard from "./pages/AgentDashboard/AgentDashboard";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Booking from "./pages/Booking/Booking";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PropertyStatusPage from "./pages/PropertyStatusPage/PropertyStatusPage"; 
import PropertyRentals from "./pages/PropertyRentals/PropertyRentals";
import Cars from "./pages/Cars/Cars";
import PropertySales from "./pages/PropertySales/PropertySales";

function App() {
  const role = localStorage.getItem("role");

  return (
    <PropertyProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute role={role}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ownerDashboard"
              element={
                <ProtectedRoute role={role}>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agentDashboard"
              element={
                <ProtectedRoute role={role}>
                  <AgentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/property-status"
              element={
                <ProtectedRoute role={role}>
                  <PropertyStatusPage />  
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/short-stays" element={<ShortStays />} />
            <Route path="/property-rentals" element={<PropertyRentals />} />
            <Route path="/cars" element={<Cars/>} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/uploadProperty" element={<UploadProperty />} />
            <Route path="/property-list" element={<PropertyList />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/sales"   element={<PropertySales />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
}

export default App;
