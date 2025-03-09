import React from 'react'
import Sidebar from '../components/commonComponents/Sidebar';
import { Outlet } from 'react-router-dom'
import ProfileLogout from '../components/userComponents/ProfileLogout';

const AdminLayout = () => {
  return (
    <div className='flex h-screen bg-gray-50'>
      <div className='relative'>
        <Sidebar/>
        </div>
      <div className='border-2 border-red-700 flex-1 overflow-y-auto relative'>
        <div className='navbar  z-30 h-12 bg-purple-300 flex items-center justify-end p-4 sticky top-0'>
           <ProfileLogout/>
        </div>
       <div className='p-3'>
       <Outlet />
       </div>
      </div>
    </div>
  )
}

export default AdminLayout