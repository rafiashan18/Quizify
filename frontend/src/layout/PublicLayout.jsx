import React from 'react'
import Footer from '../components/commonComponents/Footer'
import Navbar from '../components/commonComponents/Navbar'
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