import Navbar from '../components/UsersideComponents/Navbar'
import  Sidebar  from '../components/UsersideComponents/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className=''>
      <Sidebar />
      <div className='grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-950 dark:text-white'>
        <Navbar />
        <div className='  bg-gray-100 dark:bg-gray-950  '>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default UserLayout