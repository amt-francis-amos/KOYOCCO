import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const FeaturedPropertiesContext = createContext();

export const useFeaturedProperties = () => {
  return useContext(FeaturedPropertiesContext);
};

export const FeaturedPropertiesProvider = ({ children }) => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties'); 
        setFeaturedProperties(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <FeaturedPropertiesContext.Provider value={{ featuredProperties, loading, error }}>
      {children}
    </FeaturedPropertiesContext.Provider>
  );
};
