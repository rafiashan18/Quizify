import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/userComponents/Navbar';
import Sidebar from '../components/commonComponents/Sidebar';

const UserLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="relative">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="border-2 border-red-700 flex-1 overflow-y-auto relative">
        {/* Navbar */}
        <div className="navbar  bg-purple-300 flex items-center sticky top-0 z-40">
          <Navbar />
        </div>

        {/* Content Area */}
       
          <Outlet />
      
      </div>
    </div>
  );
};

export default UserLayout;