import React from 'react'
import Footer from '../components/Common/Footer'
import UserNavbar from '../components/Common/UserNavbar'
import { Outlet } from 'react-router-dom'

const publicLayout = () => {
    return (
        <>
            <div className=''>
                <UserNavbar />
            </div>
            <main className=''>
                <Outlet />
            </main>

            <Footer />
        </>

    )
}

export default publicLayout