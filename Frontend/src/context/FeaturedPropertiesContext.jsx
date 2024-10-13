import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const FeaturedPropertiesContext = createContext();

export const FeaturedPropertiesProvider = ({ children }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);


  const fetchFeaturedProperties = async () => {
    try {
      const response = await axios.get('https://koyocco-backend.onrender.com/api/properties');
      setFeaturedProperties(response.data); 
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  return (
    <FeaturedPropertiesContext.Provider
      value={{ featuredProperties, setFeaturedProperties }}
    >
      {children}
    </FeaturedPropertiesContext.Provider>
  );
};

export const useFeaturedProperties = () => {
  return useContext(FeaturedPropertiesContext);
};
