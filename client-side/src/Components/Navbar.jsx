import React, { useState, useEffect, useRef, useContext } from "react";
import { FaCamera, FaEdit, FaInstagram, FaUserShield, FaPen } from "react-icons/fa";
import bannerImg from "../assets/banner.svg";
import { RestaurantContexts } from "../Contexts/RestaurantsContext";

const Navbar = ({ isAdmin, setIsAdmin }) => {
    const { restaurantId } = useContext(RestaurantContexts);

    const [navData, setNavData] = useState(() => {
        const savedData = localStorage.getItem("navData");
        return savedData
            ? JSON.parse(savedData)
            : {
                logo: null,
                logoFile: null,
                banner: bannerImg,
                bannerFile: null,
                heading: "Explore Our Delicious Menu",
                paragraph: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                colors: { dark: "#000000", light: "#ffffff" },
            };
    });

    const [editingField, setEditingField] = useState(null);
    const headingRef = useRef(null);
    const paragraphRef = useRef(null);

    // Save changes to localStorage
    useEffect(() => {
        localStorage.setItem("navData", JSON.stringify(navData));
    }, [navData]);

    // Click outside to stop editing
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (editingField === "heading" && headingRef.current && !headingRef.current.contains(event.target)) ||
                (editingField === "paragraph" && paragraphRef.current && !paragraphRef.current.contains(event.target))
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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNavData((prev) => ({ ...prev, logo: reader.result, logoFile: file }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle banner image upload
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNavData((prev) => ({ ...prev, banner: imageUrl, bannerFile: file }));
        }
    };

    // Cleanup object URLs when component unmounts
    useEffect(() => {
        return () => {
            if (navData.banner) URL.revokeObjectURL(navData.banner);
        };
    }, [navData.banner]);

    // ✅ Fetch restaurant data
    useEffect(() => {
        if (!restaurantId) {
            console.error("❌ restaurantId is missing!");
            return;
        }

        const fetchProfile = async () => {
            try {
                console.log("Fetching restaurant with ID:", restaurantId);
                const authToken = localStorage.getItem("authToken")?.trim();

                const response = await fetch(`http://localhost:5001/api/restaurant/${restaurantId}`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch profile data");

                const data = await response.json();

                setNavData((prev) => ({
                    ...prev,
                    logo: getBase64Image(data.profilePicture, prev.logo),
                    banner: getBase64Image(data.bannerPicture, prev.banner),
                    heading: data.name || prev.heading,
                    paragraph: data.description || prev.paragraph,
                    colors: typeof data.colors === "object" && data.colors.dark && data.colors.light
                        ? data.colors
                        : prev.colors,
                }));
                const getBase64Image = (imageData, fallback) => {
                    return imageData ? `data:image/jpeg;base64,${imageData}` : fallback;
                };
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [restaurantId]);  // ✅ Dependency array is correct

    return (
        <>
            {/* Toggle Admin Mode Button */}
            <div
                className="z-10
                absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-gray-800 text-white text-lg rounded-full cursor-pointer hover:bg-gray-700 transition shadow-lg"
                title="Toggle Admin Mode"
                onClick={() => setIsAdmin((prev) => !prev)}
            >
                {isAdmin ? <FaUserShield className="text-yellow-400" /> : <FaPen className="text-blue-400" />}
            </div>

            <div className="relative min-h-65 text-white py-5 px-3 md:px-6 flex flex-col justify-between items-center">


                <div
                    className="absolute inset-0 w-full bg-cover bg-center -z-20 flex justify-between flex-col"
                    style={{ backgroundImage: `url(${navData.banner})` }}
                >
                    <div className="flex w-full justify-between items-start px-3 md:px-6">
                        {/* Logo (Editable) */}
                        <div className="relative flex items-center h-20 w-20">
                            <label htmlFor="logoUpload" className="cursor-pointer w-full h-full flex justify-center items-center">
                                {navData.logo ? (
                                    <img
                                        src={navData.logo}
                                        alt="Logo"
                                        className="h-20 w-20 object-contain rounded-full border border-gray-300"
                                    />
                                ) : (
                                    <span className="flex justify-center items-center h-20 w-20 bg-gray-300 rounded-full">
                                        <FaCamera className="text-gray-500 text-2xl" />
                                    </span>
                                )}
                            </label>
                            {isAdmin && (
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="logoUpload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            )}
                        </div>


                        {/* Contact Info */}
                        <ul className="flex gap-6 font-medium mt-2">
                            <li className="hover:text-gray-300 cursor-pointer">{navData.phone || "+91 8376962083"}</li>
                            <li className="hover:text-gray-300 cursor-pointer flex justify-center items-center">
                                <FaInstagram className="text-lg" />
                            </li>
                        </ul>
                    </div>

                    {/* Editable Heading & Paragraph */}
                    <div className="flex items-center flex-col gap-4 px-3 md:px-3">
                        {isAdmin && (
                            <div className="flex justify-center items-center mt-4">
                                <label htmlFor="bannerUpload" className="cursor-pointer absolute px-4 mb-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
                                    Change Background
                                </label>
                                <input type="file" accept="image/*" id="bannerUpload" className="hidden" onChange={handleBannerChange} />
                            </div>
                        )}

                        {/* Editable Heading */}
                        <div className="w-fit flex justify-center items-center relative">
                            {editingField === "heading" ? (
                                <textarea
                                    ref={headingRef}
                                    className="text-center text-xl md:text-2xl font-bold bg-transparent outline-none border-b border-gray-300 resize-none overflow-hidden"
                                    rows="1"
                                    autoFocus
                                    value={navData.heading}
                                    onChange={(e) => {
                                        handleTextChange("heading", e.target.value);
                                        e.target.style.height = "auto"; // Reset height
                                        e.target.style.height = `${e.target.scrollHeight} px`; // Adjust height dynamically
                                    }}
                                    onBlur={() => setEditingField(null)}
                                />
                            ) : (
                                <h2 className="md:text-4xl text-2xl font-bold relative text-center">
                                    {navData.heading}
                                </h2>
                            )}

                            {isAdmin && (
                                <FaEdit
                                    className="absolute -top-2 -right-6 text-sm text-green-500 cursor-pointer"
                                    onClick={() => setEditingField("heading")}
                                />
                            )}
                        </div>



                        {/* Editable Paragraph */}
                        <div className="flex w-fit relative justify-center items-center gap-4">

                            {editingField === "paragraph" ? (
                                <input
                                    ref={paragraphRef}
                                    className="text-lg w-full text-white text-center bg-transparent border border-transparent focus:border-gray-300 outline-none"
                                    value={navData.paragraph}
                                    onChange={(e) => handleTextChange("paragraph", e.target.value)}
                                    onBlur={() => setEditingField(null)}
                                />
                            ) : (
                                <p className="text-lg text-center w-full text-white">{navData.paragraph}</p>
                            )}

                            {isAdmin && <FaEdit className="absolute -top-2 -right-4 text-gray-300 cursor-pointer" onClick={() => setEditingField("paragraph")} />}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Navbar;
