import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { assets } from "../../assets/assets";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProperty } from "../../context/PropertyContext";
import ReactPaginate from "react-paginate";

const Home = () => {
  const { property } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const propertiesPerPage = 6;

  const carouselSlides = [
    { img: assets.houseImg1, text: "Find Your Dream Home" },
    { img: assets.houseImg2, text: "Experience Luxury Living" },
    { img: assets.houseImg3, text: "Affordable Housing Options" },
  ];

  // Optimized filtering with useMemo
  const filteredProperties = useMemo(() => {
    return property.filter((prop) => {
      const matchesSearchTerm =
        prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prop.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriceRange = priceRange
        ? prop.price <= parseFloat(priceRange)
        : true;
      return matchesSearchTerm && matchesPriceRange;
    });
  }, [property, searchTerm, priceRange]);

  // Paginate filtered properties
  const paginatedProperties = useMemo(() => {
    return filteredProperties.slice(
      currentPage * propertiesPerPage,
      (currentPage + 1) * propertiesPerPage
    );
  }, [filteredProperties, currentPage]);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="h-[70vh] md:h-screen">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={index}
              className="bg-cover bg-center h-[70vh] md:h-screen"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center px-4 text-center">
                <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                  {slide.text}
                </h1>
                <button
                  onClick={() => navigate("/uploadProperty")}
                  className="bg-red-500 text-white px-6 py-3 rounded-md text-sm md:text-base"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </header>

      {/* Property Listings */}
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>

        {/* Search & Filter Section */}
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/2"
          />
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border p-2 rounded-md w-full md:w-1/3"
          >
            <option value="">All Prices</option>
            <option value="100000">Up to ₵100,000</option>
            <option value="200000">Up to ₵200,000</option>
            <option value="300000">Up to ₵300,000</option>
            <option value="400000">Up to ₵400,000</option>
          </select>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <p className="text-center">Loading properties...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : paginatedProperties.length > 0 ? (
            paginatedProperties.map((prop) => (
              <Link key={prop._id} to={`/property/${prop._id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                  <div className="relative flex">
                    {prop.video && (
                      <div className="w-1/2 h-64">
                        <video
                          className="w-full h-full object-cover"
                          controls
                          src={prop.video}
                        />
                      </div>
                    )}
                    <div className={`w-${prop.video ? "1/2" : "full"} h-64`}>
                      <img
                        src={prop.images[0] || assets.placeholderImage}
                        alt={prop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {prop.name}
                      </h3>
                      <p className="text-xl font-semibold text-red-500">
                        ₵{prop.price}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {prop.description || "No description available."}
                    </p>

                    <div className="flex items-center mb-4">
                      <img
                        src={prop.companyLogo || assets.koyoccoLogo}
                        alt="Company Logo"
                        className="h-10 w-10 object-contain"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm mb-4">
                      <div>
                        <span className="font-medium">Region:</span> {prop.region || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Address:</span> {prop.address || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm md:text-base">
              No properties available at the moment.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
            onPageChange={handlePageClick}
            containerClassName="flex space-x-4"
            activeClassName="bg-red-500 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
