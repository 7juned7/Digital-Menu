import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RestaurantContexts } from "../../Contexts/RestaurantsContext";

const ForgetPassword = () => {
    const { restaurantId } = useContext(RestaurantContexts);
    const [newUser, setNewUser] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Navigation hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="flex justify-center flex-col items-center min-h-screen bg-[#800020] px-4">
            <form

                className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-[90%] max-w-[320px] text-white"
            >
                <h2 className="text-2xl text-[#FFD700] font-bold text-center mb-4">DigiMenu</h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center mb-3">{success}</p>}

                <label className="block text-[#FFD700] mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 bg-white rounded-md focus:outline-none text-black"
                    required
                />

                <label className="block mb-2 text-[#FFD700]">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 bg-white rounded-md focus:outline-none text-black"
                    required
                />
                <label className="block mb-2 text-[#FFD700]">Confirm Password</label>
                <input
                    type=""
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 bg-white rounded-md focus:outline-none text-black"
                    required
                />
                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-[#FFD700] text-[#1a1a1a] font-bold py-2 rounded-md transition disabled:opacity-50 flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    ) : (
                        "Reset Password"
                    )}
                </button>



                <div className="flex items-center w-full my-4">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="px-3 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className="my-4 text-center">

                    <Link to={"/"} className="cursor-pointer">

                        Create new account
                    </Link>
                </div>



            </form>

        </div>
    );
};

export default ForgetPassword;
