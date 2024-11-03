import React, { createContext, useState, useContext, useEffect } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [property, setProperty] = useState([]);
    
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('https://koyocco-backend.onrender.com/api/properties/upload'); // Replace with your API endpoint
                const data = await response.json();
                setProperty(data); // Assuming data is an array of properties
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const updateProperty = (newProperty) => {
        setProperty(newProperty);
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
