import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import MenuSection from '../Components/MenuSection';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import Navbar from '../Components/Navbar';

const HomePage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [restaurantId, setRestaurantId] = useState("")
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            try {
                const decodedToken = jwtDecode(token); // Decode JWT

                setIsAdmin(true);
                setRestaurantId(decodedToken.id); // Get restaurantId
                console.log(decodedToken.id)
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <>
            <Navbar isAdmin={isAdmin} setIsAdmin={setIsAdmin}
                restaurantId={restaurantId} />
            <MenuSection
                restaurantId={restaurantId}
                isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
            <Footer />
        </>
    );
};

export default HomePage;
