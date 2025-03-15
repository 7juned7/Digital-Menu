import React from 'react';
import biryani from "../assets/FoodImages/pizza.png"
const MenuSection = () => {
    const menuItems = [
        { id: 1, name: 'Margherita Pizza', category: 'Main Course', price: '$12', image: biryani },
        { id: 2, name: 'Caesar Salad', category: 'Appetizers', price: '$8', image: biryani },
        { id: 3, name: 'Chocolate Lava Cake', category: 'Desserts', price: '$10', image: biryani },
        { id: 4, name: 'Mojito', category: 'Drinks', price: '$6', image: biryani },
    ];
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
            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
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
            </div>


            {/* Menu Items Section */}
            <div className=' flex flex-wrap gap-4 mb-4 w-full'>

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


            </div>


        </div>
    );
};

export default MenuSection;
