import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaEdit, FaInstagram } from "react-icons/fa";
import bannerImg from "../assets/banner.svg";

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const [navData, setNavData] = useState({
        logo: null,
        banner: bannerImg,
        heading: "Explore Our Delicious Menu",
        paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    });

    const [editingField, setEditingField] = useState(null); // Track the currently editing field
    const inputRef = useRef(null); // Reference for input field

    // Mock isAdmin state (Replace this with actual authentication logic)
    // Change to false to hide edit features

    // Handle text updates
    const handleTextChange = (key, value) => {
        setNavData((prev) => ({ ...prev, [key]: value }));
    };

    // Handle banner image change
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNavData((prev) => ({ ...prev, banner: imageUrl }));
        }
    };

    // Handle logo image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNavData((prev) => ({ ...prev, logo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Detect clicks outside of the input field
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setEditingField(null); // Disable editing only if clicked outside
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div onClick={() => setIsAdmin(prev => !prev)}>Admin View</div>
            <div className="relative min-h-65 text-white py-5 px-3 md:px-6 flex justify-between">

                {/* Background Image with Overlay */}
                <div className="absolute inset-0 w-full h-65 bg-black opacity-50 -z-10"></div>
                <img className="absolute inset-0 w-full h-65 object-cover -z-20" src={navData.banner} alt="banner" />

                <div className="flex w-full h-10 justify-between items-center">
                    {/* Logo (Editable by Admin) */}
                    <div className="relative flex items-center h-15 w-20">
                        <label htmlFor="logoUpload" className="cursor-pointer">
                            {navData.logo ? (
                                <img src={navData.logo} alt="Logo" className="h-15 w-15 object-contain" />
                            ) : (
                                <span className="flex justify-center items-center h-16 w-16 bg-gray-300 rounded-full">
                                    <FaCamera className="text-gray-500" />
                                </span>
                            )}
                        </label>
                        {isAdmin && (
                            <input type="file" accept="image/*" id="logoUpload" className="hidden" onChange={handleImageChange} />
                        )}
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex gap-6 font-medium">

                        <li className="hover:text-gray-300 cursor-pointer">+91 8376962083</li>
                        <li className="hover:text-gray-300 cursor-pointer flex justify-center items-center"><FaInstagram className="text-lg " /></li>
                    </ul>
                </div>



                {/* Bottom Centered Text (Editable by Admin) */}
                <div className="absolute flex flex-col gap-4 w-full px-2 items-center bottom-5 left-1/2 transform -translate-x-1/2">
                    {/* Change Banner Button (Only for Admin) */}
                    {isAdmin && (
                        <div className="flex justify-center items-center mt-4">
                            <label
                                htmlFor="bannerUpload"
                                className="cursor-pointer absolute px-4 mb-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                            >
                                Change Background
                            </label>
                            <input type="file" accept="image/*" id="bannerUpload" className="hidden" onChange={handleBannerChange} />
                        </div>
                    )}
                    <div className="flex w-fit relative justify-center items-center gap-4">
                        {editingField === "heading" ? (
                            <input
                                ref={inputRef}
                                className="text-2xl font-bold bg-transparent border-b border-gray-300 outline-none"
                                autoFocus
                                value={navData.heading}
                                onChange={(e) => handleTextChange("heading", e.target.value)}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold">{navData.heading}</h2>
                        )}
                        {isAdmin && (
                            <FaEdit
                                className="absolute -top-1.5 -right-3.5 text-[14px] text-gray-300 cursor-pointer"
                                onClick={() => setEditingField("heading")}
                            />
                        )}
                    </div>


                    <div className="flex justify-center gap-2 relative">
                        {editingField === "paragraph" ? (
                            <input
                                ref={inputRef}
                                className="text-sm font-extralight bg-transparent border-b border-gray-300 outline-none"
                                autoFocus
                                value={navData.paragraph}
                                onChange={(e) => handleTextChange("paragraph", e.target.value)}
                            />
                        ) : (
                            <p className="text-sm font-extralight">{navData.paragraph}</p>
                        )}
                        {isAdmin && (
                            <FaEdit
                                className="absolute -top-1.5 -right-3.5 text-[14px] text-gray-300 cursor-pointer"
                                onClick={() => setEditingField("paragraph")}
                            />
                        )}
                    </div>


                </div>
            </div>
        </>
    );
};

export default Navbar;
