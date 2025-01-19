import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { assets } from "../../assets/assets";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";

const Home = () => {
  const { property } = useProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filteredProperties = property.filter((prop) => {
    const matchesSearchTerm =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = priceRange
      ? prop.price <= parseFloat(priceRange)
      : true;
    return matchesSearchTerm && matchesPriceRange;
  });

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
          {[assets.houseImg1, assets.houseImg2, assets.houseImg3].map(
            (img, index) => (
              <div
                key={index}
                className="bg-cover bg-center h-[70vh] md:h-screen"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center px-4 text-center">
                  <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
                    Find Your Dream Home
                  </h1>
                  <Link
                    to="/login"
                    className="bg-red-500 text-white px-6 py-3 rounded-md text-sm md:text-base"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            )
          )}
        </Carousel>
      </header>

      <div className="container mx-auto my-8 px-4">
        <section className="my-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => (
                <Link key={prop._id} to={`/property/${prop._id}`}>
                  <div className="border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
                    <img
                      src={prop.images[0]}
                      alt={prop.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg md:text-xl">{prop.name}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{prop.description}</p>
                      <p className="text-red-500 font-bold text-sm md:text-base">
                        ₵{prop.price}
                      </p>
                      <p className="text-gray-500 text-xs md:text-sm">{prop.location}</p>
                      <p className="text-red-600 text-xl font-bold md:text-sm mt-2">
                        {prop.propertyType}
                      </p>

                      <div className="flex items-center mt-4">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            prop.status === "available"
                              ? "bg-green-500"
                              : prop.status === "rented"
                              ? "bg-blue-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm md:text-base font-medium text-gray-700">
                          {prop.status.charAt(0).toUpperCase() + prop.status.slice(1)}
                        </span>
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
        </section>
      </div>
    </div>
  );
};

export default Home;
