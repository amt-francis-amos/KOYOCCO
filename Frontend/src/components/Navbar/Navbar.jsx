import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import axios from 'axios'

const Navbar = () => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    shortStays: false,
    rental: false,
    propertySales: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userProfile, setUserProfile] = useState({ profileImage: "", role: "" });

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  
    // Fetch user profile data if logged in
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "https://koyocco-backend.onrender.com/api/User/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          
          const data = response.data;
          console.log(response.data);
          setUserProfile({
            profileImage: data.profileImage || assets.uploadImg, 
            role: data.role || "User", 
          });
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
  
      fetchUserData();
    }
  }, [localStorage.getItem("authToken"),userProfile]);
  

  const updateLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    updateLoginStatus();
    navigate("/");
    closeMenuOnLinkClick();
  };

  const closeMenuOnLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen({
      shortStays: false,
      rental: false,
      propertySales: false,
    });
  };

  const goToProfile = () => {
    navigate("/profile");
    closeMenuOnLinkClick();
  };

  const handleMouseLeave = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: false,
    }));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" onClick={closeMenuOnLinkClick}>
          <img
            src={assets.koyoccoLogo}
            className="w-[80px]"
            alt="Koyocco Logo"
          />
        </Link>

        <div className="lg:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes size={24} aria-label="Close menu" />
          ) : (
            <FaBars size={24} aria-label="Open menu" />
          )}
        </div>

        <ul
          className={`lg:flex lg:items-center lg:space-x-6 fixed lg:static top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-8 lg:p-0 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:transform-none transition-transform duration-300 ease-in-out z-50`}
        >
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <Link to="/" onClick={closeMenuOnLinkClick}>
              <img
                src={assets.koyoccoLogo}
                className="w-[50px]"
                alt="Koyocco Logo"
              />
            </Link>
            <div onClick={toggleMenu}>
              <FaTimes size={24} aria-label="Close menu" />
            </div>
          </div>

          {/* Navigation Links */}
          <li>
            <Link
              to="/"
              className="hover:text-gray-700 block py-2 lg:py-0"
              onClick={closeMenuOnLinkClick}
            >
              Home
            </Link>
          </li>

          {/* Short-Stays Dropdown */}
          <li
            className="relative group"
            onMouseLeave={() => handleMouseLeave("shortStays")}
          >
            <Link
              to="/short-stays"
              className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
              onClick={closeMenuOnLinkClick}
            >
              <span>
                Short-Stays
              </span>
            </Link>

          
          </li>

          {/* Rental Dropdown */}
          <li
            className="relative group"
            onMouseLeave={() => handleMouseLeave("rental")}
          >
            <Link
              to="/property-rentals"
              className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
              onClick={closeMenuOnLinkClick}
            >
              <span>
                Property Rentals 
              </span>
            </Link>

         
          </li>
      
          <li
            className="relative"
            onMouseLeave={() => handleMouseLeave("propertySales")}
          >
            <Link
              to="/sales"
              onClick={closeMenuOnLinkClick}
              className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
            
            >
              <span>
                Property Sales 
              </span>
            </Link>

           
          </li>

          {/* Other Links */}
          <li>
            <Link
              to="/cars"
              className="hover:text-gray-700 block py-2 lg:py-0"
              onClick={closeMenuOnLinkClick}
            >
              Cars
            </Link>
          </li>
          <li>
            <Link
              to="/uploadProperty"
              className="hover:text-gray-700 block py-2 lg:py-0"
              onClick={closeMenuOnLinkClick}
            >
              Upload a Property
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-gray-700 block py-2 lg:py-0"
              onClick={closeMenuOnLinkClick}
            >
              About
            </Link>
          </li>

          {isLoggedIn && (
            <li className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={goToProfile}
              >
                <img
                  src={userProfile?.profileImage || assets.defaultProfilePic}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => (e.target.src = assets.defaultProfilePic)} // Fallback if image fails to load
                />

                <span className="hidden lg:block text-gray-700">
                  {userProfile.role}
                </span>
              </div>
            </li>
          )}

          {isLoggedIn ? (
            <li className="lg:hidden mt-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black w-full"
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li className="lg:hidden mt-4">
                <Link to="/login" onClick={closeMenuOnLinkClick}>
                  <button className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black w-full">
                    Login
                  </button>
                </Link>
              </li>
              <li className="lg:hidden">
                <Link to="/signup" onClick={closeMenuOnLinkClick}>
                  <button className="bg-red-500 mt-2 text-white px-7 py-2 rounded-md hover:bg-black w-full">
                    Signup
                  </button>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Desktop-Only Buttons */}
        <div className="hidden lg:flex lg:items-center space-x-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
