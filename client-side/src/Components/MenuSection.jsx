import React, { useContext, useEffect, useState } from "react";
import AddFood from "./AddFood";
import FoodItem from "./FoodItem"; // Import the new component
import SkeletonCard from "./Loders/skeletonCard";


const MenuSection = ({ isAdmin }) => {


    const [theme, setTheme] = useState("maroon");
    const [menuStyle, setMenuStyle] = useState("style-2");
    const [flag, setFlag] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Theme colors
    const themes = {
        light: {
            bg: "bg-white",
            cardBg: "bg-gray-200",
            text: "text-black",
            highlight: "bg-gray-400",
        },
        dark: {
            bg: "bg-black",
            cardBg: "bg-gray-800",
            text: "text-white",
            highlight: "bg-gray-600",
        },
        maroon: {
            bg: "bg-[#800020]",
            cardBg: "bg-[#FFD700]",
            text: "text-black",
            highlight: "bg-[#FFC107]",
        },
    };

    const restaurantId = localStorage.getItem("restaurantId")
    useEffect(() => {
        const fetchMenu = async () => {
            if (!restaurantId) return;
            const id = restaurantId;
            try {

                console.log(id)
                const response = await fetch(`http://localhost:5001/api/restaurant/${id}/menu`);

                if (!response.ok) {
                    throw new Error("Failed to fetch menu");
                }
                const data = await response.json();
                console.log(data)
                const updatedMenu = data.map((item) => ({
                    ...item,
                    image: item.image ? `data:image/png;base64,${item.image}` : null,
                }));
                setMenuItems(updatedMenu);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, [restaurantId]);

    return (
        <div className={`p-6 ${themes[theme].bg} transition-all duration-300`}>
            {/* Filter Section */}
            <div className="mb-4 flex gap-4 flex-wrap">
                {["All", "Appetizers", "Main Course", "Desserts", "Drinks"].map((category) => (
                    <button
                        key={category}
                        className={`px-2 py-1 md:px-4 md:py-2 ${themes[theme].highlight} font-medium hover:bg-gray-300`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Admin Controls */}
            <div className="flex justify-between  w-full items-center">
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setFlag((prev) => !prev)}
                            className={`px-8 py-2 ${themes[theme].highlight} ${themes[theme].text} rounded-md transition duration-300 ease-in-out`}
                        >
                            Add Food
                        </button>

                        {/* Theme Selector */}
                        <select
                            className={`px-4 py-2 rounded-md border border-gray-500 shadow-md cursor-pointer transition-all duration-300 ${theme === "light" ? "bg-gray-300 text-black" : ""
                                } ${theme === "dark" ? "bg-gray-600 text-white" : ""} ${theme === "maroon" ? "bg-[#FFD700] text-black" : ""
                                }`}
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="light">🌞 Light</option>
                            <option value="dark">🌙 Dark</option>
                            <option value="maroon">🍷 Maroon</option>
                        </select>

                        {/* Menu Style Selector */}
                        <select
                            className={`px-4 py-2 ${themes[theme].highlight} ${themes[theme].text} rounded-md border border-gray-600 shadow-md cursor-pointer`}
                            value={menuStyle}
                            onChange={(e) => setMenuStyle(e.target.value)}
                        >
                            <option value="style-1">🔲 Grid</option>
                            <option value="style-2">📄 Stacked</option>

                        </select>
                    </>
                )}
            </div>

            {/* Add Food Modal */}
            <AddFood flag={flag} setFlag={setFlag} />

            {/* Food Items Section */}

            <div className="my-4" >

                {loading ? (
                    <div className={menuStyle === "style-1" ? "grid grid-cols-2 md:grid-cols-3 gap-3" : "flex flex-wrap gap-4"}>
                        {Array(6).fill("").map((_, index) => (
                            <SkeletonCard key={index} menuStyle={menuStyle} />
                        ))}
                    </div>
                ) : (
                    <div className={menuStyle === "style-1" ? "grid grid-cols-2 md:grid-cols-3 gap-3" : "flex flex-wrap gap-4"}>
                        {menuItems.map((item) => (
                            <FoodItem key={item._id} item={item} menuStyle={menuStyle} theme={themes[theme]} flag={flag} setFlag={setFlag} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuSection;
