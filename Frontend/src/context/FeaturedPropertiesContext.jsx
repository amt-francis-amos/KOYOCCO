import React, { createContext, useState, useContext } from "react";

import { featuredProperties as initialFeaturedProperties } from "../assets/assets";

const FeaturedPropertiesContext = createContext();


export const FeaturedPropertiesProvider = ({ children }) => {
  
  const [featuredProperties, setFeaturedProperties] = useState(
    initialFeaturedProperties
  );

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
