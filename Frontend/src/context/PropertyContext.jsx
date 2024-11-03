import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // Import axios

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
    const [property, setProperty] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get('https://koyocco-backend.onrender.com/api/properties'); // Use axios to fetch data
                setProperty(response.data); // Set the properties to state
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, []);

    const updateProperty = (newProperty) => {
        setProperty(newProperty);
    };

    const addProperty = (newProperty) => {
        setProperty((prevProperties) => [...prevProperties, newProperty]);
    };

    return (
        <PropertyContext.Provider value={{ property, updateProperty, addProperty }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperty = () => {
    return useContext(PropertyContext);
};
