import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; 

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [listings, setListings] = useState([]);  // Added state for listings

    // Fetch properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://koyocco-backend.onrender.com/api/properties'); 
                setProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    // Fetch listings
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('https://koyocco-backend.onrender.com/api/listings'); 
                setListings(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };

        fetchListings();
    }, []);

    const updateProperty = (newProperty) => {
        setProperties((prevProperties) => [...prevProperties, newProperty]);  // Add new property to the list
    };

    const updateListing = (newListing) => {
        setListings((prevListings) => [...prevListings, newListing]);  
    };

    return (
        <PropertyContext.Provider value={{ properties, listings, updateProperty, updateListing }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperty = () => {
    return useContext(PropertyContext);
};
