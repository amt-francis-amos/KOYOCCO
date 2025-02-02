import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios"; // For API requests

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const propertiesPerPage = 6;

  useEffect(() => {
    // Fetch properties from backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get("/api/properties");
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((prop) => {
    const matchesSearchTerm =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriceRange = priceRange
      ? prop.price <= parseFloat(priceRange)
      : true;
    return matchesSearchTerm && matchesPriceRange;
  });

  const paginatedProperties = filteredProperties.slice(
    currentPage * propertiesPerPage,
    (currentPage + 1) * propertiesPerPage
  );

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[70vh] md:h-screen">
        {/* Your Carousel or other header content */}
      </header>

      <div className="container mx-auto my-8 px-4">
        <section className="my-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Featured Properties
          </h2>

          {/* Search and Filter Section */}
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

          {/* Property Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.length > 0 ? (
              paginatedProperties.map((prop) => (
                <Link key={prop._id} to={`/property/${prop._id}`}>
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                    <img
                      src={prop.images[0]}
                      alt={prop.name}
                      className="w-full h-48 object-cover"
                    />
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
                        {prop.description}
                      </p>
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
                            className={`${
                              prop.status === "available"
                                ? "text-green-500"
                                : prop.status === "sold"
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            {prop.status.charAt(0).toUpperCase() +
                              prop.status.slice(1)}
                          </span>
                        </div>
                      </div>

                      {/* Display Company Logo */}
                      <div className="flex justify-center mt-4">
                        <img
                          src={prop.companyLogo}
                          alt="Company Logo"
                          className="w-12 h-12 object-cover rounded-full"
                        />
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
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="flex space-x-4"
              pageClassName="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              previousClassName="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              nextClassName="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              disabledClassName="text-gray-400 cursor-not-allowed"
              activeClassName="bg-red-500 text-white"
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
