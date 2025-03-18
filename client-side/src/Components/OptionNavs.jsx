import React, { useState } from 'react';

const OptionNavs = ({ isAdmin, setIsAdmin, handleSave }) => {
    return (
        <div className="flex gap-4 p-4 bg-gray-100 shadow-md rounded-lg">
            {/* Toggle Admin Mode */}
            <div
                className="absolute bottom-4 right-4 flex items-center justify-center w-12 h-12 bg-gray-800 text-white text-lg rounded-full cursor-pointer hover:bg-gray-700 transition shadow-lg"
                title="Toggle Admin Mode"
                onClick={() => setIsAdmin((prev) => !prev)}
            >
                {isAdmin ? <FaUser className="text-yellow-400" /> : <FaPen className="text-blue-400" />}
            </div>

            {/* Save Changes - Only Visible When Admin */}
            {isAdmin && (
                <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-md bg-green-500 text-white"
                >
                    Save Changes
                </button>
            )}
        </div>
    );
};

export default OptionNavs;
