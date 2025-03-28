import React from 'react'
import Sidebar from '../components/Common/Sidebar';
import { Outlet } from 'react-router-dom'
import DashboardTopBar from '../components/Common/DashboardTopBar';

const AdminLayout = () => {
  return (
    <div className="relative h-screen">
      <Sidebar />
      
      <div className="md:ml-56 h-full flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-purple-300 flex items-center sticky top-0 z-50">
          <DashboardTopBar isAdmin={true}/>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout