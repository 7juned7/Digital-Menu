import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantContexts } from "../Contexts/RestaurantsContext";

const Register = () => {
    const { restaurantId } = useContext(RestaurantContexts);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate(); // Navigation hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5001/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // Save token in local storage
            localStorage.setItem("authToken", data.token);

            setSuccess("Registration successful! 🎉");
            setFormData({ email: "", password: "" });

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("http://localhost:5001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Save token in local storage
            localStorage.setItem("authToken", data.token);

            setSuccess("Login successful! 🎉");

            // Redirect to home page after login
            setTimeout(() => navigate(`/${restaurantId}`), 1500);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#800020] px-4">
            <form
                onSubmit={handleRegister}
                className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-[90%] max-w-[320px] text-white"
            >
                <h2 className="text-2xl text-[#FFD700] font-bold text-center mb-4">Register / Login</h2>

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

                <button
                    type="submit"
                    className="w-full bg-[#FFD700] text-[#1a1a1a] font-bold py-2 rounded-md transition disabled:opacity-50 flex justify-center items-center"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                    ) : (
                        "Register"
                    )}
                </button>

                {/* Login Button */}
                <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full mt-3 bg-gray-700 text-white font-bold py-2 rounded-md transition hover:bg-gray-600"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Register;
