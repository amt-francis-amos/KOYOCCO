import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const PropertySales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const fetchPropertySales = async () => {
    try {
      const response = await axios.get(
        "https://koyocco-backend.onrender.com/api/properties?propertyType=PropertySales"
      );

      const filteredSales = response.data.filter(
        (property) => property.propertyType === "PropertySales"
      );

      setSales(filteredSales);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch property sales");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertySales();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/property/${id}`);
  };

  const handleBookSales = (sale) => {
    navigate("/booking", {
      state: {
        id: sale._id,
        name: sale.name,
        price: sale.price,
        location: sale.location,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Property Sales</h1>
      {sales.length === 0 ? (
        <p className="text-center text-gray-600">No Sales properties available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sales.map((sale) => (
            <div
              key={sale._id}
              onClick={() => handleCardClick(sale._id)}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
            >
              {sale.images && sale.images.length > 0 && (
                <img
                  src={sale.images[0]}
                  alt={sale.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{sale.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{sale.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-red-500 font-bold text-lg">₵{sale.price.toLocaleString()}</span>
                  <span className="text-gray-500 text-sm">{sale.location}</span>
                </div>
              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertySales;
