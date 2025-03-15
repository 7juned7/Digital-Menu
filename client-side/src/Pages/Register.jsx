import React, { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registered User:", formData);
        // You can add logic to send data to the backend
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#800020]">
            <form
                onSubmit={handleSubmit}
                className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-80 text-white"
            >
                <h2 className="text-2xl text-[#FFD700] font-bold text-center mb-4">Register</h2>

                <label className="block text-[#FFD700] mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 bg-white rounded-md focus:outline-none"
                    required
                />

                <label className="block mb-2 text-[#FFD700] ">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 mb-4 bg-white rounded-md focus:outline-none"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-[#FFD700]  text-[#1a1a1a] font-bold py-2 rounded-md transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
