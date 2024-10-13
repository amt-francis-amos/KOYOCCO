import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const FeaturedPropertiesContext = createContext();

export const FeaturedPropertiesProvider = ({ children }) => {


  const [featuredProperties, setFeaturedProperties] = useState([]);



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
