import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [property, setProperty] = useState([]);

    // Fetch properties on component mount
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://koyocco-backend.onrender.com/api/properties');
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    // Update property list dynamically
    const updateProperty = (newProperty) => {
        setProperty((prevProperties) => [newProperty, ...prevProperties]); // Add new property to the beginning
    };

    return (
        <PropertyContext.Provider value={{ property, updateProperty }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperty = () => {
    return useContext(PropertyContext);
};
