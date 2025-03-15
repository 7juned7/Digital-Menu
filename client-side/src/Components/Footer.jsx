import React from 'react'

const Footer = () => {
    return (
        <footer className='mt-0 p-6 bg-gray-900 text-white text-center'>
            <p className='mb-2'>&copy; 2025 DigitalMenu. All rights reserved.</p>
            <div className='flex justify-center gap-6'>
                <a href='#' className='hover:text-gray-400'>Facebook</a>
                <a href='#' className='hover:text-gray-400'>Instagram</a>
                <a href='#' className='hover:text-gray-400'>Twitter</a>
            </div>
        </footer>
    )
}

export default Footer