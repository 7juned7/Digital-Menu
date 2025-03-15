import React, { useState } from 'react'
import Footer from '../Components/Footer'
import MenuSection from '../Components/MenuSection'
import Navbar from '../Components/Navbar'

const HomePage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    return (
        <>
            <Navbar
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin} />
            <MenuSection
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin} />
            <Footer />

        </>
    )
}

export default HomePage