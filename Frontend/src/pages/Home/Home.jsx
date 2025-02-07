import React, { useState } from "react";
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
  const [priceType, setPriceType] = useState(""); // New state for price type
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const propertiesPerPage = 6;

  const carouselSlides = [
    { img: assets.houseImg1, text: "Find Your Dream Home" },
    { img: assets.houseImg2, text: "Experience Luxury Living" },
    { img: assets.houseImg3, text: "Affordable Housing Options" },
  ];

  const filteredProperties = property.filter((prop) => {
    const matchesSearchTerm =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = priceRange
      ? prop.price <= parseFloat(priceRange)
      : true;
    return matchesSearchTerm && matchesPriceRange;
  });

  // Paginate filtered properties
  const paginatedProperties = filteredProperties.slice(
    currentPage * propertiesPerPage,
    (currentPage + 1) * propertiesPerPage
  );

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const handleNavigateToLogin = () => {
    navigate("/uploadProperty");
  };

  return (
    <div className="flex flex-col min-h-screen">
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
                  onClick={handleNavigateToLogin}
                  className="bg-red-500 text-white px-6 py-3 rounded-md text-sm md:text-base"
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </header>

      <div className="container mx-auto my-8 px-4">
        <div className="my-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>

          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded-md w-full md:w-1/3"
            />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border p-2 rounded-md w-full md:w-1/4"
            >
              <option value="">All Prices</option>
              <option value="100000">Up to ₵100,000</option>
              <option value="200000">Up to ₵200,000</option>
              <option value="300000">Up to ₵300,000</option>
              <option value="400000">Up to ₵400,000</option>
            </select>

            {/* Dropdown for selecting price type */}
            <select
              value={priceType}
              onChange={(e) => setPriceType(e.target.value)}
              className="border p-2 rounded-md w-full md:w-1/4"
            >
              <option value="">Select Price Type</option>
              <option value="perMonth">Per Month</option>
              <option value="perDay">Per Day</option>
              <option value="total">Total</option>
              <option value="perHour">Per Hour</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((prop) => (
                <div key={prop._id} className="relative">
                  <div
                    className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
                    onClick={() => navigate(`/property/${prop._id}`)}
                  >
                    <div className="relative">
                      <div className="flex flex-col md:flex-row">
                        {prop.video && (
                          <div className="w-full md:w-1/2 h-64">
                            <video
                              className="w-full h-full object-cover"
                              controls
                              src={prop.video}
                              alt={prop.name}
                            />
                          </div>
                        )}
                        <div
                          className={`${
                            prop.video ? "w-full md:w-1/2" : "w-full"
                          } h-64`}
                        >
                          <img
                            src={prop.images[0]}
                            alt={prop.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">{prop.name}</h3>
                        <p className="text-xl font-semibold text-red-500">
                          ₵{prop.price} {priceType && `(${priceType.replace(/([A-Z])/g, ' $1').trim()})`}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{prop.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm mb-4">
                        <div className="flex flex-col">
                          <span className="font-medium">Region</span>
                          <span>{prop.region}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Address</span>
                          <span>{prop.address}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Condition</span>
                          <span>{prop.condition}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">Status</span>
                          <span
                            className={
                              prop.status === "available"
                                ? "text-green-500"
                                : prop.status === "rented"
                                ? "text-blue-500"
                                : "text-red-500"
                            }
                          >
                            {prop.status.charAt(0).toUpperCase() +
                              prop.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-sm md:text-base">
                No properties available at the moment.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
