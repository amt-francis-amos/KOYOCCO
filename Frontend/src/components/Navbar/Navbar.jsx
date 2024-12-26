import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    shortStays: false,
    rental: false,
    propertySales: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Check login status as soon as the component mounts
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // If token exists, user is logged in
  }, []);

  const closeMenuOnLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen({
      shortStays: false,
      rental: false,
      propertySales: false,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
    closeMenuOnLinkClick();
  };

  // Function to hide dropdown when mouse leaves the menu
  const handleMouseLeave = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: false,
    }));
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMenuOnLinkClick}>
          <img
            src={assets.koyoccoLogo}
            className="w-[80px]"
            alt="Koyocco Logo"
          />
        </Link>

        {/* Hamburger Icon */}
        <div className="lg:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes size={24} aria-label="Close menu" />
          ) : (
            <FaBars size={24} aria-label="Open menu" />
          )}
        </div>

        {/* Menu Links */}
        <ul
          className={`lg:flex lg:items-center lg:space-x-6 fixed lg:static top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-8 lg:p-0 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:transform-none transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Mobile Menu Header (logo + close icon) */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <Link to="/" onClick={closeMenuOnLinkClick}>
              <img
                src={assets.koyoccoLogo}
                className="w-[80px]"
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
              onClick={() => toggleDropdown("shortStays")}
            >
              <span className="flex items-center">
                Short-Stays <FaChevronDown size={13} className="ml-2" />
              </span>
            </Link>

            {/* Dropdown Content */}
            <ul
              className={`absolute left-0 z-10 mt-1 bg-white shadow-lg rounded-md py-2 w-48 ${
                dropdownOpen.shortStays ? "block" : "hidden"
              } transition-opacity ease-in-out duration-300`}
            >
              <li>
                <Link
                  to="/hotels"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Hotels
                </Link>
              </li>
              <li>
                <Link
                  to="/movie-house"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Movie House
                </Link>
              </li>
              <li>
                <Link
                  to="/guest-house"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Guest House
                </Link>
              </li>
            </ul>
          </li>

          {/* Rental Dropdown */}
          <li
            className="relative group"
            onMouseLeave={() => handleMouseLeave("rental")}
          >
            <Link
              to="/property-rentals"
              className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
              onClick={() => toggleDropdown("rental")}
            >
              <span className="flex items-center">
                Property Rentals <FaChevronDown size={13} className="ml-2" />
              </span>
            </Link>

            {/* Dropdown Content */}
            <ul
              className={`absolute z-10 left-0 bg-white shadow-lg rounded-md py-2 w-48 ${
                dropdownOpen.rental ? "block" : "hidden"
              } transition-opacity ease-in-out duration-300`}
            >
              <li>
                <Link
                  to="/apartments"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  to="/condos"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Condos
                </Link>
              </li>
              <li>
                <Link
                  to="/houses"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Houses
                </Link>
              </li>
              <li>
                <Link
                  to="/duplex"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Duplex
                </Link>
              </li>
              <li>
                <Link
                  to="/office"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Office
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={closeMenuOnLinkClick}
                >
                  Shop
                </Link>
              </li>
            </ul>
          </li>
          {/* Property Sales Dropdown */}
          <li
            className="relative"
            onMouseLeave={() => handleMouseLeave("propertySales")}
          >
            <button
              className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
              onClick={() => toggleDropdown("propertySales")}
            >
              <span className="flex items-center">
                Property Sales <FaChevronDown size={13} className="ml-2" />
              </span>
            </button>
            {dropdownOpen.propertySales && (
              <ul className="absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48 transition-opacity ease-in-out duration-300">
                <li>
                  <Link
                    to="/houses"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMenuOnLinkClick}
                  >
                    Houses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/land"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMenuOnLinkClick}
                  >
                    Land
                  </Link>
                </li>
                <li>
                  <Link
                    to="/commercial"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={closeMenuOnLinkClick}
                  >
                    Commercial
                  </Link>
                </li>
              </ul>
            )}
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

          {/* Mobile-Only Buttons */}
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
