import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import Booking from "./pages/Booking/Booking";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PropertyStatusPage from "./pages/PropertyStatusPage/PropertyStatusPage";
import PropertyRentals from "./pages/PropertyRentals/PropertyRentals";
import Cars from "./pages/Cars/Cars";
import PropertySales from "./pages/PropertySales/PropertySales";
import Profile from "./pages/Profile/Profile";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import Dashboard from "../../admin/src/pages/Admin/Dashboard";
import RequestsDashboard from "./pages/RequestsDashboard/RequestedDashboard";


const getRoleFromLocalStorage = () => localStorage.getItem("role");

function App() {
  const role = getRoleFromLocalStorage();

  return (
    <PropertyProvider>
      <div className="flex flex-col min-h-screen">
        <ToastContainer position="top-right" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute role={role}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-login"
              element={
                <ProtectedRoute role={role} requiredRoles={["admin"]}>
                 <Dashboard />
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
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/short-stays" element={<ShortStays />} />
            <Route path="/property-rentals" element={<PropertyRentals />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/booking" element={<Booking />} />
            <Route
              path="/uploadProperty"
              element={
                <ProtectedRoute role={role}>
                  <UploadProperty />
                </ProtectedRoute>
              }
            />
            <Route path="/property-list" element={<PropertyList />} />
            <Route path="/profile-update" element={<ProfileUpdate />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/sales" element={<PropertySales />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/request-dashboard" element={<RequestsDashboard />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PropertyProvider>
  );
}

export default App;
