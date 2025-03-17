import React, { useState } from 'react';
import biryani from "../assets/FoodImages/pizza.png";
import AddFood from './AddFood';

const MenuSection = ({ isAdmin }) => {
    const [theme, setTheme] = useState("maroon");
    const [menuStyle, setMenuStyle] = useState("style-1");
    const [flag, setFlag] = useState(false);

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

    const menuItems = [
        { id: 1, name: 'Margherita Pizza', category: 'Main Course', price: '$12', image: biryani },
        { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: '$8', image: biryani },
        { id: 3, name: 'Chocolate Lava Cake', category: 'Desserts', price: '$10', image: biryani },
        { id: 4, name: 'Mojito', category: 'Drinks', price: '$6', image: biryani },
    ];

    return (
        <div className={`p-6 min-h-screen ${themes[theme].bg} transition-all duration-300`}>


            {/* Filter Section */}
            <div className="mb-4 flex gap-4 flex-wrap">
                {['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'].map((category) => (
                    <button key={category} className={`px-2 py-1 md:px-4 md:py-2 ${themes[theme].highlight} font-medium hover:bg-gray-300`}>
                        {category}
                    </button>
                ))}
            </div>

            {/* Admin Controls */}
            <div className="flex justify-between w-full items-center">
                {isAdmin && (
                    <>
                        <button
                            onClick={() => setFlag(prev => !prev)}
                            className={`px-8 py-2 ${themes[theme].highlight} ${themes[theme].text} rounded-md transition duration-300 ease-in-out`}
                        >
                            Add Food
                        </button>
                        {/* Theme Selector */}
                        <div className="flex justify-end">
                            <select
                                className={`px-4 py-2 rounded-md border border-gray-500 shadow-md cursor-pointer transition-all duration-300 
            ${theme === "light" ? "bg-gray-300 text-black" : ""}
            ${theme === "dark" ? "bg-gray-600 text-white" : ""}
            ${theme === "maroon" ? "bg-[#FFD700] text-black" : ""}`}
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                <option value="light">🌞 Light</option>
                                <option value="dark">🌙 Dark</option>
                                <option value="maroon">🍷 Maroon</option>
                            </select>
                        </div>

                        <div className="my-4">
                            <select
                                className={`px-4 py-2 ${themes[theme].highlight} ${themes[theme].text} rounded-md border border-gray-600 shadow-md cursor-pointer`}
                                value={menuStyle}
                                onChange={(e) => setMenuStyle(e.target.value)}
                            >
                                <option value="style-1">🔲 Grid</option>
                                <option value="style-2">📄 Stacked</option>
                                <option value="style-3">🌀 Zigzag</option>
                            </select>
                        </div>
                    </>
                )}
            </div>

            {/* Add Food Modal */}
            <AddFood flag={flag} setFlag={setFlag} />


            {/* Grid Style (style-1) */}
            {menuStyle === "style-1" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 w-full">
                    {menuItems.map((item) => (
                        <div key={item.id} className={`relative w-full shadow-lg overflow-hidden ${themes[theme].cardBg}`}>
                            {/* Image Section with Fade Effect */}
                            <div className="relative w-full h-36">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />

                                {/* Smooth Fade between Image and Info */}
                                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-inherit"></div>
                            </div>

                            {/* Food Info */}
                            <div className={`p-3 flex justify-between items-center`}>
                                <h3 className={`text-lg font-semibold ${themes[theme].text}`}>{item.name}</h3>
                                <p className={`font-bold text-xs sm:text-sm md:text-base lg:text-lg ${themes[theme].text}`}>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Stacked Style (style-2) */}
            {menuStyle === "style-2" && (
                <div className="flex flex-wrap gap-4 mb-4 w-full">
                    {menuItems.map((item) => (
                        <div key={item.id} className={`flex w-full shadow-lg rounded-lg ${themes[theme].cardBg}`}>
                            {/* Image */}
                            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover border-2 border-gray-400" />

                            {/* Food Details */}
                            <div className="flex-1 flex flex-col justify-center ml-4">
                                <h3 className={`text-lg font-semibold ${themes[theme].text}`}>{item.name}</h3>
                                <p className={`font-bold text-xs sm:text-sm md:text-base lg:text-lg ${themes[theme].text}`}>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Zigzag Style (style-3) */}
            {menuStyle === "style-3" && (
                <div className="flex flex-wrap gap-4 mb-4 w-full">
                    {menuItems.map((item, index) => (
                        <div key={item.id} className={`flex w-full shadow-lg rounded-md ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} ${themes[theme].cardBg}`}>
                            {/* Image */}
                            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover border-2 border-gray-400" />

                            {/* Food Details */}
                            <div className="flex-1 mt-4">
                                <h3 className={`text-lg px-4 font-semibold ${themes[theme].text}`}>{item.name}</h3>
                                <p className={`font-bold px-4 text-xs sm:text-sm md:text-base lg:text-lg ${themes[theme].text}`}>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuSection;
