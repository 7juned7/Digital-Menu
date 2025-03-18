import React from "react";

const FoodItem = ({ item, menuStyle, theme }) => {
    return (
        <>
            {/* Grid Style (style-1) */}
            {menuStyle === "style-1" && (
                <div className={`relative w-full shadow-lg overflow-hidden ${theme.cardBg}`}>
                    {/* Image Section */}
                    <div className="relative w-full h-36">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-inherit"></div>
                    </div>

                    {/* Food Info */}
                    <div className={`p-3 flex justify-between items-center`}>
                        <h3 className={`text-lg font-semibold ${theme.text}`}>{item.name}</h3>
                        <p className={`font-bold text-xs sm:text-sm md:text-base lg:text-lg ${theme.text}`}>{item.price}</p>
                    </div>
                </div>
            )}

            {/* Stacked Style (style-2) */}
            {menuStyle === "style-2" && (
                <div className={`flex w-full shadow-lg rounded-lg ${theme.cardBg}`}>
                    {/* Image */}
                    <img src={item.image} alt={item.name} className="w-32 h-32 object-cover border-2 border-gray-400" />

                    {/* Food Details */}
                    <div className="flex-1 flex flex-col justify-center ml-4">
                        <h3 className={`text-lg font-semibold ${theme.text}`}>{item.name}</h3>
                        <p className={`font-bold text-xs sm:text-sm md:text-base lg:text-lg ${theme.text}`}>{item.price}</p>
                    </div>
                </div>
            )}


        </>
    );
};

export default FoodItem;
