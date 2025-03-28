import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardTopBar from '../components/Common/DashboardTopBar';
import Sidebar from '../components/Common/Sidebar';

const UserLayout = () => {
  return (
    <div className="relative h-screen">
      <Sidebar />
      
      <div className="md:ml-56 h-full flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-purple-300 flex items-center sticky top-0 z-50">
          <DashboardTopBar isAdmin={false}/>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;