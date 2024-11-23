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

  // Toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Check if user is logged in by looking for auth token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Close the menu and reset dropdowns when clicking a link
  const closeMenuOnLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen({ shortStays: false, rental: false, propertySales: false });
  };

  // Handle mouse enter and leave for dropdowns
  const handleMouseEnter = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: true }));
  };

  const handleMouseLeave = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: false }));
  };

  // Handle logout process
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/");
    closeMenuOnLinkClick();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={closeMenuOnLinkClick}>
          <img src={assets.koyoccoLogo} className="w-[80px]" alt="Koyocco Logo" />
        </Link>

        {/* Menu Icon */}
        <div className="lg:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>

        {/* Menu Links */}
        <ul
          className={`lg:flex lg:items-center lg:space-x-6 fixed lg:static top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent p-8 lg:p-0 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:transform-none transition-transform duration-300 ease-in-out z-50`}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-4 lg:hidden">
            <Link to="/" onClick={closeMenuOnLinkClick}>
              <img src={assets.koyoccoLogo} className="w-[80px]" alt="Koyocco Logo" />
            </Link>
            <div onClick={toggleMenu}>
              <FaTimes size={24} aria-label="Close menu" />
            </div>
          </div>

          {/* Navigation Links */}
          <NavItem to="/" text="Home" closeMenu={closeMenuOnLinkClick} />

          {/* Dropdowns */}
          <DropdownMenu
            title="Short-Stays"
            to="/short-stays"
            options={["Hotels", "Movie House", "Guest House"]}
            open={dropdownOpen.shortStays}
            onMouseEnter={() => handleMouseEnter("shortStays")}
            onMouseLeave={() => handleMouseLeave("shortStays")}
            closeMenu={closeMenuOnLinkClick}
          />
          <DropdownMenu
            title="Property Rentals"
            to="/property-rentals"
            options={["Apartments", "Condos", "Houses", "Duplex", "Office", "Shop"]}
            open={dropdownOpen.rental}
            onMouseEnter={() => handleMouseEnter("rental")}
            onMouseLeave={() => handleMouseLeave("rental")}
            closeMenu={closeMenuOnLinkClick}
          />
          <DropdownMenu
            title="Property Sales"
            to="/property-sales"
            options={["Houses", "Land", "Commercial"]}
            open={dropdownOpen.propertySales}
            onMouseEnter={() => handleMouseEnter("propertySales")}
            onMouseLeave={() => handleMouseLeave("propertySales")}
            closeMenu={closeMenuOnLinkClick}
          />

          <NavItem to="/cars" text="Cars" closeMenu={closeMenuOnLinkClick} />
          <NavItem to="/uploadProperty" text="Upload a Property" closeMenu={closeMenuOnLinkClick} />
          <NavItem to="/about" text="About" closeMenu={closeMenuOnLinkClick} />

          {/* Login/Logout */}
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

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center space-x-4">
          {!isLoggedIn ? (
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
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-7 py-2 rounded-md hover:bg-black"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

// Reusable Navbar Item Component
const NavItem = ({ to, text, closeMenu }) => (
  <li>
    <Link to={to} className="hover:text-gray-700 block py-2 lg:py-0" onClick={closeMenu}>
      {text}
    </Link>
  </li>
);

// Reusable Dropdown Menu Component
const DropdownMenu = ({ title, to, options, open, onMouseEnter, onMouseLeave, closeMenu }) => (
  <li
    className="relative group"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <Link
      to={to}
      className="hover:text-gray-700 py-2 lg:py-0 flex items-center focus:outline-none"
    >
      <span className="flex items-center">
        {title} <FaChevronDown size={13} className="ml-2" />
      </span>
    </Link>

    <ul
      className={`absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-48 ${open ? "block" : "hidden"} transition-opacity ease-in-out duration-300`}
    >
      {options.map((option, index) => (
        <li key={index}>
          <Link
            to={`/${option.toLowerCase().replace(/\s+/g, "-")}`}
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={closeMenu}
          >
            {option}
          </Link>
        </li>
      ))}
    </ul>
  </li>
);

export default Navbar;
