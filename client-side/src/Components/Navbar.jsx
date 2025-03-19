import React, { useState, useEffect, useRef, useContext } from "react";
import { FaCamera, FaEdit, FaInstagram, FaUserShield, FaPen } from "react-icons/fa";
import bannerImg from "../assets/banner.svg";
import { RestaurantContexts } from "../Contexts/RestaurantsContext";

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const { restaurantId } = useContext(RestaurantContexts);

    const [navData, setNavData] = useState({
        logo: null,
        logoFile: null,
        banner: bannerImg,
        bannerFile: null,
        phone: null,
        instagram: null,
        heading: null,
        description: null,
        colors: { dark: "#000000", light: "#ffffff" },
    });

    const [editingField, setEditingField] = useState(null);
    const headingRef = useRef(null);
    const descriptionRef = useRef(null);
    const phoneRef = useRef(null);
    const instagramRef = useRef(null);

    // Save changes to localStorage
    useEffect(() => {
        if (!restaurantId) return
        const fetchNavData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/restaurant`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                });

                const data = await response.json();
                localStorage.setItem("restaurantId", data._id)
                if (response.ok) {
                    setNavData({
                        logo: data.profilePicture ? `data: image / png; base64, ${data.profilePicture} ` : null,
                        banner: data.bannerPicture ? `data: image / png; base64, ${data.bannerPicture} ` : bannerImg,
                        heading: data.name || "Explore Our Delicious Menu",
                        phone: data.phone || "+91 8762340134",
                        instagram: data.instagram || "7juned7",
                        description: data.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                        colors: data.colors || { dark: "#000000", light: "#ffffff" },
                    });
                } else {
                    console.error("Failed to fetch profile:", data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchNavData();
    }, []);


    // Click outside to stop editing
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (editingField === "heading" && headingRef.current && !headingRef.current.contains(event.target)) ||
                (editingField === "description" && descriptionRef.current && !descriptionRef.current.contains(event.target)) ||
                (editingField === "phone" && phoneRef.current && !phoneRef.current.contains(event.target)) ||
                (editingField === "instagram" && instagramRef.current && !instagramRef.current.contains(event.target))
            ) {
                setEditingField(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [editingField]);

    // Handle text updates
    const handleTextChange = (key, value) => {
        setNavData((prev) => ({ ...prev, [key]: value }));
    };


    // Handle image uploads (logo)
    const handleImageChange = (e) => {
        if (!isAdmin) return; // Only allow admin to update
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNavData((prev) => ({
                    ...prev,
                    logo: reader.result,
                    logoFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };


    // Handle banner image upload
    const handleBannerChange = (e) => {
        if (!isAdmin) return;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNavData((prev) => ({
                    ...prev,
                    banner: reader.result,
                    bannerFile: file,
                }));
            };
            reader.readAsDataURL(file);
        }
    };



    // Cleanup object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (navData.banner) URL.revokeObjectURL(navData.banner);
        };
    }, [navData.banner]);

    // ✅ API call to update restaurant profile

    useEffect(() => {
        if (isAdmin) {
            localStorage.setItem("navData", JSON.stringify(navData));
        }


    }, [navData, isAdmin]);

    // 🔥 Call API when the admin changes data

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (editingField === "heading" && headingRef.current && !headingRef.current.contains(event.target)) ||
                (editingField === "description" && paragraphRef.current && !paragraphRef.current.contains(event.target)) ||
                (editingField === "phone" && phoneRef.current && !phoneRef.current.contains(event.target)) ||
                (editingField === "instagram" && instagramRef.current && !instagramRef.current.contains(event.target))
            ) {
                setTimeout(() => setEditingField(null), 100); // Small delay to prevent flickering
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [editingField]);
    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("name", navData.heading);
        formData.append("description", navData.description);
        formData.append("phone", navData.phone);
        formData.append("instagram", navData.instagram);

        // Append colors
        Object.keys(navData.colors).forEach((key) => {
            formData.append(`colors.${key} `, navData.colors[key]);
        });

        // Append images if they are changed
        if (navData.logoFile) formData.append("profilePicture", navData.logoFile);
        if (navData.bannerFile) formData.append("bannerPicture", navData.bannerFile);

        try {
            const response = await fetch("http://localhost:5001/api/update", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")} `,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setNavData({
                    logo: data.profilePicture ? `data: image / png; base64, ${data.profilePicture} ` : null,
                    banner: data.bannerPicture ? `data: image / png; base64, ${data.bannerPicture} ` : bannerImg,
                    heading: data.name || "Explore Our Delicious Menu",
                    phone: data.phone || "+91 9861084271",
                    instagram: data.instagram || "7juned7",
                    description: data.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                    colors: data.colors || { dark: "#000000", light: "#ffffff" },
                });
                console.log(navData)
            } else {
                console.error("Failed to fetch profile:", data);
            }
        } catch (error) {
            console.error("Error:", error);

        }
    };

    return (
        <>
            {/* Toggle Admin Mode Button */}
            <div
                className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-gray-800 text-white text-lg rounded-full cursor-pointer hover:bg-gray-700 transition shadow-lg"
                title="Toggle Admin Mode"
                onClick={() => setIsAdmin((prev) => !prev)}
            >
                {isAdmin ? <FaUserShield className="text-yellow-400" /> : <FaPen className="text-blue-400" />}
            </div>
            <div onClick={handleUpdate}>save update</div>

            <div className="relative min-h-65 text-white py-5 px-3 md:px-6 flex justify-between">
                <div className="absolute inset-0 w-full h-65 bg-black opacity-50 -z-10"></div>
                <img className="absolute inset-0 w-full h-65 object-cover -z-20" src={navData.banner} alt="banner" />

                <div className="flex w-full justify-between items-start">
                    {/* Logo (Editable) */}
                    <div className="relative flex items-center h-20 w-20">
                        <label htmlFor="logoUpload" className="cursor-pointer">
                            {navData.logo ? (
                                <img src={navData.logo} alt="Logo" className="h-20 w-20 object-contain rounded-full" />
                            ) : (
                                <span className="flex justify-center items-center h-20 w-20 bg-gray-300 rounded-full">
                                    <FaCamera className="text-gray-500" />
                                </span>
                            )}
                        </label>
                        {isAdmin && <input type="file" accept="image/*" id="logoUpload" className="hidden" onChange={handleImageChange} />}
                    </div>

                    {/* Contact Info */}
                    <ul className="flex gap-10 font-medium mt-2">
                        <li className="hover:text-gray-300 cursor-pointer relative">
                            <div>
                                {editingField === "phone" ? (
                                    <input
                                        ref={phoneRef}
                                        className="text-2xl font-bold bg-transparent border-b border-gray-300 outline-none"
                                        autoFocus
                                        value={navData.phone}
                                        onChange={(e) => handleTextChange("phone", e.target.value)}
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold">{navData.phone}</h2>
                                )}
                                {isAdmin && <FaEdit className="absolute -top-2 -right-4 text-gray-300 cursor-pointer" onClick={() => setEditingField("phone")} />}
                            </div>
                        </li>
                        <li className="hover:text-gray-300 cursor-pointer flex justify-center items-center">
                            <div>
                                {editingField === "instagram" ? (
                                    <input
                                        ref={instagramRef}
                                        className="text-2xl font-bold bg-transparent border-b border-gray-300 outline-none"
                                        autoFocus
                                        value={navData.instagram}
                                        onChange={(e) => handleTextChange("instagram", e.target.value)}
                                    />
                                ) : (
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        <a href={`https://www.instagram.com/${navData.instagram}`} target="_blank" rel="noopener noreferrer">
                                            <FaInstagram />

                                        </a>
                                    </h2>
                                )}
                                {isAdmin && <FaEdit className="absolute top-5 right-1 text-gray-300 cursor-pointer" onClick={() => setEditingField("instagram")} />}
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Editable Heading & Paragraph */}
                <div className="absolute flex flex-col gap-4 w-full px-2 items-center bottom-5 left-1/2 transform -translate-x-1/2">
                    {isAdmin && (
                        <div className="flex justify-center items-center mt-4">
                            <label htmlFor="bannerUpload" className="cursor-pointer absolute px-4 mb-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                                Change Background
                            </label>
                            <input type="file" accept="image/*" id="bannerUpload" className="hidden" onChange={handleBannerChange} />
                        </div>
                    )}

                    {/* Editable Heading */}
                    <div className="flex w-fit relative justify-center items-center gap-4">
                        {editingField === "heading" ? (
                            <input
                                ref={headingRef}
                                className="text-2xl font-bold bg-transparent border-b border-gray-300 outline-none"
                                autoFocus
                                value={navData.heading}
                                onChange={(e) => handleTextChange("heading", e.target.value)}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold">{navData.heading}</h2>
                        )}
                        {isAdmin && <FaEdit className="absolute -top-2 -right-4 text-gray-300 cursor-pointer" onClick={() => setEditingField("heading")} />}
                    </div>
                    <div className="flex w-fit relative justify-center items-center gap-4">
                        {editingField === "description" ? (
                            <input
                                ref={descriptionRef}
                                className="text-2xl font-bold bg-transparent border-b border-gray-300 outline-none"
                                autoFocus
                                value={navData.description}
                                onChange={(e) => handleTextChange("description", e.target.value)}
                            />
                        ) : (
                            <h2 className="text-2xl font-bold">{navData.description}</h2>
                        )}
                        {isAdmin && <FaEdit className="absolute -top-2 -right-4 text-gray-300 cursor-pointer" onClick={() => setEditingField("description")} />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
