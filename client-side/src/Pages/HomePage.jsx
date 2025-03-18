import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import MenuSection from "../Components/MenuSection";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import Navbar from "../Components/Navbar";
import OptionNavs from "../Components/OptionNavs";

const HomePage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [restaurantId, setRestaurantId] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode JWT

                // Check if the user is an admin
                if (decodedToken.role === "admin") {

                    setIsAdmin(true);
                }

                // Ensure `restaurantId` exists before setting it
                if (decodedToken.id) {
                    setRestaurantId(decodedToken.id);
                    console.log("Restaurant ID:", decodedToken.id);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <>
            <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin} restaurantId={restaurantId}
            />
            <MenuSection restaurantId={restaurantId} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Footer />


        </>
    );
};

export default HomePage;
