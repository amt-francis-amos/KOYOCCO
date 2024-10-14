import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Import Axios

// Initial featured properties (you can keep this or remove it)
import { featuredProperties as initialFeaturedProperties } from "../assets/assets";

const FeaturedPropertiesContext = createContext();

export const FeaturedPropertiesProvider = ({ children }) => {
  const [featuredProperties, setFeaturedProperties] = useState(initialFeaturedProperties);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get('https://koyocco-backend.onrender.com/api/properties'); 
        setFeaturedProperties(response.data); 
      } catch (err) {
        setError(err); // Handle the error
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchFeaturedProperties();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Return loading or error state
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error fetching properties: {error.message}</div>;
  }

  return (
    <FeaturedPropertiesContext.Provider value={{ featuredProperties, setFeaturedProperties }}>
      {children}
    </FeaturedPropertiesContext.Provider>
  );
};

export const useFeaturedProperties = () => {
  return useContext(FeaturedPropertiesContext);
};
