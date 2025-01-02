import React from 'react'
import Footer from '../components/HomepageComponents/Footer'
import Navbar from '../components/HomepageComponents/Navbar'
import { Outlet } from 'react-router-dom'

const publicLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>

            <Footer />
        </>

    )
}

export default publicLayout