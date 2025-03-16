import React, { useState } from 'react';
import biryani from "../assets/FoodImages/pizza.png";
import AddFood from './AddFood';

const MenuSection = ({ isAdmin }) => {
    const menuItems = [
        { id: 1, name: 'Margherita Pizza', category: 'Main Course', price: '$12', image: biryani },
        { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: '$8', image: biryani },
        { id: 3, name: 'Chocolate Lava Cake', category: 'Desserts', price: '$10', image: biryani },
        { id: 4, name: 'Mojito', category: 'Drinks', price: '$6', image: biryani },
    ];

    const [flag, setFlag] = useState(false);
    const [menuStyle, setMenuStyle] = useState("style-1");

    return (
        <div className="p-6 bg-[#800020]">
            {/* Filter Section */}
            <div className="mb-4 flex gap-4 flex-wrap">
                {['All', 'Appetizers', 'Main Course', 'Desserts', 'Drinks'].map((category) => (
                    <button key={category} className="px-2 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300">
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
                            className="px-8 py-2 bg-[#FFD700] text-black rounded-md transition duration-300 ease-in-out hover:bg-[#FFC107] border-yellow-600"
                        >
                            Add Food
                        </button>
                        <div className="my-4">
                            <select
                                className="px-4 py-2 bg-[#FFD700] text-black rounded-md border border-yellow-600 shadow-md cursor-pointer"
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
                        <div key={item.id} className="relative w-full shadow-lg  overflow-hidden">

                            {/* Image Section (Prevent Yellow Background Overflow) */}
                            <div className="relative w-full h-36 bg-white">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-b from-transparent to-[#FFD700]"></div>
                            </div>

                            {/* Food Info Section (Keep Yellow Background Here) */}
                            <div className="bg-[#FFD700] p-3 flex justify-between items-center">
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{item.name}</h3>
                                <p className="font-bold text-[#1a1a1a] text-xs sm:text-sm md:text-base lg:text-lg">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {/* Stacked Style (style-2) */}
            {menuStyle === "style-2" && (
                <div className="flex flex-wrap gap-4 mb-4 w-full">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex w-full bg-[#2a2a2a] text-white shadow-lg rounded-lg"
                        >
                            {/* Bigger Food Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover border-2 border-yellow-400"
                            />

                            {/* Food Details with Margin */}
                            <div className="flex-1 flex flex-col justify-center ml-4">
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{item.name}</h3>
                                <p className="font-bold text-[#FFD700] text-xs sm:text-sm md:text-base lg:text-lg">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}



            {/* Zigzag Style (style-3) */}

            {menuStyle === "style-3" && (
                <div className="flex flex-wrap gap-4 mb-4 w-full">
                    {menuItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex w-full shadow-lg rounded-md 
                ${index % 2 === 0 ? "flex-row bg-[#2a2a2a]" : "flex-row-reverse bg-[#3a3a3a]"}`}
                        >
                            {/* Food Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover  border-2 border-yellow-400"
                            />

                            {/* Food Details */}
                            <div className="flex-1 mt-4">
                                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl px-4 font-semibold text-white">{item.name}</h3>
                                <p className="font-bold px-4 text-[#FFD700] text-xs sm:text-sm md:text-base lg:text-lg">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};

export default MenuSection;
