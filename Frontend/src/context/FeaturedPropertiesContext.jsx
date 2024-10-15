import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const FeaturedPropertiesContext = createContext();

export const FeaturedPropertiesProvider = ({ children }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get(
          "https://koyocco-backend.onrender.com/api/properties"
        );
        console.log("API Response:", response);

        if (response.data && response.data.properties) {
          setFeaturedProperties(response.data.properties);
        } else {
          setFeaturedProperties(response.data);
        }
      } catch (err) {
        setError(err); 
        console.error("Error fetching properties:", err);
      }
    };

    fetchFeaturedProperties();
  }, []);

  if (error) {
    return <div>Error fetching properties: {error.message}</div>;
  }

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
