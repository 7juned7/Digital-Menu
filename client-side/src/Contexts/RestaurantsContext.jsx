import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const RestaurantContexts = createContext();

export const RestaurantsProvider = ({ children }) => {
    const [restaurantId, setRestaurantId] = useState(null);
    const [role, setRole] = useState("user");

    useEffect(() => {
        try {
            const token = localStorage.getItem("authToken"); // Get token
            if (!token) return; // Exit if no token found

            const decodedToken = jwtDecode(token); // Decode JWT
            if (decodedToken?.id) setRestaurantId(decodedToken.id); // Extract restaurantId
            if (decodedToken?.role) setRole(decodedToken.role); // Extract role
        } catch (error) {
            console.error("Invalid or expired token:", error);
        }
    }, []);

    return (
        <RestaurantContexts.Provider value={{ restaurantId, role }}>
            {children}
        </RestaurantContexts.Provider>
    );
};
