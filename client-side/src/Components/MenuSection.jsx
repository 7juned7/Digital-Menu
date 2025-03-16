import React from 'react';
import { useState } from 'react';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules"; // ✅ Import required modules
// import "swiper/css";
// import "swiper/css/navigation"; // ✅ Import styles for navigation
// import "swiper/css/pagination"; // ✅ Import styles for pagination

import biryani from "../assets/FoodImages/pizza.png"
import AddFood from './AddFood';
const MenuSection = ({ isAdmin }) => {
    const menuItems = [
        { id: 1, name: 'Margherita Pizza', category: 'Main Course', price: '$12', image: biryani },
        { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: '$8', image: biryani },
        { id: 3, name: 'Chocolate Lava Cake', category: 'Desserts', price: '$10', image: biryani },
        { id: 4, name: 'Mojito', category: 'Drinks', price: '$6', image: biryani },
    ];
    const [flag, setFlag] = useState(false)
    const [menuStyle, setMenuStyle] = useState("style-3")
    return (
        <div className='p-6 bg-[#800020]'>
            {/* Filter Section */}
            <div className='mb-4 flex gap-4 flex-wrap'>
                <button className='px-1.5 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300'>All</button>
                <button className='px-1.5 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300'>Appetizers</button>
                <button className='px-1.5 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300'>Main Course</button>
                <button className='px-1.5 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300'>Desserts</button>
                <button className='px-1.5 py-1 md:px-4 md:py-2 bg-[#FFD700] font-medium hover:bg-gray-300'>Drinks</button>
            </div>
            <div>
                <div className='flex  justify-between w-full items-center' >


                    {isAdmin && (
                        <>
                            <button onClick={() => setFlag(prev => !prev)} className='px-8 py-2 bg-[#FFD700] text-black rounded-md transition duration-300 ease-in-out
                   hover:bg-[#FFC107] focus:outline-none
                   shadow-md cursor-pointer  border-yellow-600"'>Add Food</button>
                            <div className="my-4 text-center">
                                <select
                                    className="px-4 py-2 bg-[#FFD700] text-black rounded-md transition duration-300 ease-in-out 
                   hover:bg-[#FFC107] focus:ring-2 focus:ring-[#FFD700] focus:outline-none 
                   shadow-md cursor-pointer border border-yellow-600"
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
                <div>
                    <AddFood
                        flag={flag}
                        setFlag={setFlag} />


                </div>


            </div>




            {/* <Swiper
                modules={[Navigation, Pagination]} // ✅ Enable swipe & navigation
                spaceBetween={20}
                slidesPerView={1.2} // ✅ Show 1.2 slides on small screens
                navigation // ✅ Show navigation arrows
                pagination={{ clickable: true }} // ✅ Enable pagination dots
                breakpoints={{
                    640: { slidesPerView: 2 }, // 2 items on tablets
                    1024: { slidesPerView: 3 }, // 3 items on large screens
                }}
                className="w-full"
            >
                {menuItems.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <div className={`flex w-full bg-[#1a1a1a] text-white rounded-lg shadow-lg p-3 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                            {/* Food Image */}
            {/* <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />

            {/* Food Details */}
            {/* <div className="flex-1">
                <h3 className="text-lg px-4 font-semibold">{item.name}</h3>
                <p className="text-sm px-4 text-gray-400">{item.category}</p>
                <p className="font-bold px-4 text-yellow-400">{item.price}</p>
            </div>
        </div>
                    </SwiperSlide >
                ))}
            </Swiper >  */}

            {
                menuStyle === "style-1" && (<div className="grid grid-cols-2 gap-4 mb-4 w-full">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="w-full pb-2 bg-[#1a1a1a] text-white rounded-lg shadow-lg flex flex-col"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-md mb-3"
                            />
                            <h3 className="text-lg px-2 font-semibold">{item.name}</h3>
                            <p className="text-sm px-2 text-gray-400">{item.category}</p>
                            <p className="font-bold px-2 text-yellow-400">{item.price}</p>
                        </div>
                    ))}
                </div>)
            }



            {/* Menu Items Section */}
            <div className=' flex flex-wrap gap-4 mb-4 w-full'>

                {
                    menuStyle === "style-2" && (
                        <>
                            {menuItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex w-full bg-[#1a1a1a] text-white rounded-lg shadow-lg p-3 space-x-4"
                                >
                                    {/* Food Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />

                                    {/* Food Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-sm text-gray-400">{item.category}</p>
                                        <p className="font-bold text-yellow-400">{item.price}</p>
                                    </div>

                                </div>
                            ))}
                        </>
                    )

                }
                {
                    menuStyle === "style-3" && (
                        <>
                            {menuItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`flex w-full bg-[#1a1a1a] text-white rounded-lg shadow-lg p-3  ${index % 2 === 0 ? "flex-row " : "flex-row-reverse"
                                        }`}
                                >
                                    {/* Food Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />

                                    {/* Food Details */}
                                    <div className="flex-1">
                                        <h3 className="text-lg px-4  font-semibold">{item.name}</h3>
                                        <p className="text-sm  px-4 text-gray-400">{item.category}</p>
                                        <p className="font-bold px-4  text-yellow-400">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
                }






            </div>


        </div >
    );
};

export default MenuSection;
