import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { assets } from "../../assets/assets"; // Ensure your logo is in assets
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useProperty } from "../../context/PropertyContext"; 
import ReactPaginate from "react-paginate";

const Home = () => {
  const { property } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const propertiesPerPage = 6;

  const carouselSlides = [
    { img: assets.houseImg1, text: "Find Your Dream Home" },
    { img: assets.houseImg2, text: "Experience Luxury Living" },
    { img: assets.houseImg3, text: "Affordable Housing Options" },
  ];

  const handleNavigateToLogin = () => {
    navigate("/uploadProperty");
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredProperties = property
    .filter((prop) => 
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (priceRange ? prop.price <= parseInt(priceRange) : true)
    );

  const displayedProperties = filteredProperties.slice(
    currentPage * propertiesPerPage,
    (currentPage + 1) * propertiesPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="relative h-[70vh] md:h-screen">
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

      {/* Property Listings Section */}
      <section className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/3"
          />

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="p-2 border rounded-md w-full md:w-1/4 mt-3 md:mt-0"
          >
            <option value="">All Prices</option>
            <option value="50000">Up to 50,000</option>
            <option value="100000">Up to 100,000</option>
            <option value="200000">Up to 200,000</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProperties.map((prop) => (
            <div key={prop.id} className="relative border rounded-md p-4 shadow-md">
              {/* Logo in Property Card */}
              <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow-md">
                <img src={assets.logo} alt="Company Logo" className="h-10 w-10" />
              </div>

              <img src={prop.image} alt={prop.name} className="w-full h-40 object-cover rounded-md" />
              <h2 className="text-xl font-semibold mt-2">{prop.name}</h2>
              <p className="text-gray-600">{prop.location}</p>
              <p className="text-red-500 font-bold mt-2">${prop.price}</p>
              <Link to={`/property/${prop.id}`} className="text-blue-500 mt-2 block">
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredProperties.length > propertiesPerPage && (
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
            onPageChange={handlePageChange}
            containerClassName="flex justify-center mt-6 space-x-2"
            pageClassName="px-3 py-2 bg-gray-200 rounded-md"
            activeClassName="bg-blue-500 text-white"
          />
        )}
      </section>
    </div>
  );
};

export default Home;
