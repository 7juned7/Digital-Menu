import React, { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const AddFood = ({ addFood, flag, setFlag }) => {
    const [foodData, setFoodData] = useState({
        name: "",
        category: "",
        price: "",
        image: null,
    });

    // Handle input change
    const handleChange = (e) => {
        setFoodData({ ...foodData, [e.target.name]: e.target.value });
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFoodData({ ...foodData, image: imageUrl });
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!foodData.name || !foodData.category || !foodData.price) {
            alert("Please fill in all fields");
            return;
        }
        addFood(foodData);
        setFoodData({ name: "", category: "", price: "", image: null });
        setFlag(false); // Close popup after adding food
    };

    // Hide component if flag is false
    if (!flag) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity duration-500 ease-in-out opacity-100">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full relative transform transition-transform duration-500 ease-in-out scale-100">
                {/* Header with Close Button */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-yellow-500">Add New Food Item</h2>
                    <FaRegWindowClose
                        className="text-yellow-500 cursor-pointer hover:text-red-500 transition-colors duration-300"
                        onClick={() => setFlag(false)}
                    />
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Food Name"
                        value={foodData.name}
                        onChange={handleChange}
                        className="px-4 py-2 bg-gray-800 rounded-md"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={foodData.category}
                        onChange={handleChange}
                        className="px-4 py-2 bg-gray-800 rounded-md"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={foodData.price}
                        onChange={handleChange}
                        className="px-4 py-2 bg-gray-800 rounded-md appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        style={{ MozAppearance: "textfield" }} // Firefox fix
                    />

                    {/* Custom File Upload */}
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="imageUpload"
                            className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded-md"
                        >
                            Upload Image
                        </label>
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />

                        {/* Image Preview */}
                        {foodData.image && (
                            <img
                                src={foodData.image}
                                alt="Preview"
                                className="mt-3 w-24 h-24 object-cover rounded-md border"
                            />
                        )}
                    </div>

                    <button type="submit" className="bg-yellow-500 px-4 py-2 rounded-md">
                        Add Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
