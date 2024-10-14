import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { assets } from '../../assets/assets';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useFeaturedProperties } from '../../context/FeaturedPropertiesContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    location: '',
    priceRange: '',
    propertyType: ''
  });
  const [sortAttribute, setSortAttribute] = useState('price');
  const { featuredProperties, loading, error } = useFeaturedProperties();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const filteredProperties = featuredProperties
    .filter((property) => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery) ||
        property.location.toLowerCase().includes(searchQuery);
      return matchesSearch;
    })
    .filter((property) => {
      const priceValue = parseFloat(property.price);
      const selectedPriceRange = parseFloat(filter.priceRange);
      const matchesLocation = !filter.location || property.location.toLowerCase() === filter.location.toLowerCase();
      const matchesPrice = !filter.priceRange || priceValue <= selectedPriceRange;
      const matchesType = !filter.propertyType || property.type === filter.propertyType;

      return matchesLocation && matchesPrice && matchesType;
    });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortAttribute === 'price') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sortAttribute === 'dateAdded') {
      return new Date(b.dateAdded) - new Date(a.dateAdded);
    }
    return 0;
  });

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center">Error loading properties</div>;

  return (
    <div>
      <header className="h-screen">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={5000}
        >
          {[assets.houseImg1, assets.houseImg2, assets.houseImg3].map((img, index) => (
            <div key={index} className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${img})` }}>
              <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
                <p className="text-white text-lg md:text-xl mb-8">Browse through the best properties available.</p>
                <Link to="/propertyList" className="bg-red-500 text-white px-6 py-3 rounded-full">Get Started</Link>
              </div>
            </div>
          ))}
        </Carousel>
      </header>

      <div className="container mx-auto my-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex-grow mb-4 md:mb-0">
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Search for properties..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg md:ml-4" onClick={handleSearch}>Search</button>
        </div>

        <div className="flex flex-wrap justify-between mb-4">
          {['priceRange', 'location', 'propertyType'].map((filterName) => (
            <select
              key={filterName}
              name={filterName}
              value={filter[filterName]}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg p-2 mb-4 w-full md:w-auto md:mb-0"
            >
              <option value="">Select {filterName.charAt(0).toUpperCase() + filterName.slice(1)}</option>
              {filterName === 'priceRange' && (
                <>
                  <option value="50000">Up to 50,000</option>
                  <option value="100000">Up to 100,000</option>
                  <option value="150000">Up to 150,000</option>
                  <option value="200000">Up to 200,000</option>
                </>
              )}
              {filterName === 'location' && (
                <>
                  <option value="Tema">Tema</option>
                  <option value="Spintex">Spintex</option>
                  <option value="Kaneshie">Kaneshie</option>
                  <option value="Nungua">Nungua</option>
                  <option value="Osu">Osu</option>
                  <option value="Kasoa">Kasoa</option>
                </>
              )}
              {filterName === 'propertyType' && (
                <>
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Cottage">Cottage</option>
                  <option value="Loft">Loft</option>
                </>
              )}
            </select>
          ))}
          <select
            value={sortAttribute}
            onChange={(e) => setSortAttribute(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full md:w-auto"
          >
            <option value="price">Sort by Price</option>
            <option value="dateAdded">Sort by Date Added</option>
          </select>
        </div>

        <section className="my-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.length > 0 ? (
              sortedProperties.map((property) => (
                <Link to={`/property/${property.id}`} key={property.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <img src={property.images[0]} alt={property.title} className="w-full h-64 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                    <p className="text-gray-600">{property.location}</p>
                    <p className="text-gray-800 font-semibold">{property.price}</p>
                    <p className="text-gray-500 mt-2">{property.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No properties found.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
