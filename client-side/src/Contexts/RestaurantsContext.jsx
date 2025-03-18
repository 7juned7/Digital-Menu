import { jwtDecode } from "jwt-decode";
import { createContext, useState, useEffect } from "react";

export const RestaurantContexts = createContext();

export const RestaurantsProvider = ({ children }) => {
    const [restaurantId, setRestaurantId] = useState(null);
    const [role, setRole] = useState("user")
    console.log(localStorage)

    useEffect(() => {

        // Get token from local storage (or session storage)
        const token = localStorage.getItem("authToken");
        console.log(token)
        if (token) {
            console.log(token)
            const decodedToken = jwtDecode(token); // Decode JWT
            console.log(decodedToken)
            setRestaurantId(decodedToken.id); // Extract restaurantId
            setRole(decodedToken.role)
        }
    }, []);

    return (
        <RestaurantContexts.Provider value={{ restaurantId, role }}>
            {children}
        </RestaurantContexts.Provider>
    );
};
