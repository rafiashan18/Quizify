import React from 'react'
import Footer from '../components/commonComponents/Footer'
import Navbar from '../components/commonComponents/Navbar'
import { Outlet } from 'react-router-dom'

const publicLayout = () => {
    return (
        <>
            <div className=''><Navbar /></div>
            <main>
                <Outlet />
            </main>

            <Footer />
        </>

    )
}

export default publicLayout