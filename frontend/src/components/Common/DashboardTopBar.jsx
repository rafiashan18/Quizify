import React from 'react';
import UserQuizSearchBar from '../UserDashboard/UserQuizSearchbar';
import AdminQuizSearchBar from '../AdminDashboard/AdminQuizSearchBar';
import ProfileDropdown from './ProfileDropdown';

const DashboardTopBar = ({ isAdmin = false }) => {
  return (
    <div className='flex z-50 md:justify-end justify-end items-center md:me-6 w-full gap-3 text-gray-900 border-b rounded-sm p-4 dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
      {isAdmin ? <AdminQuizSearchBar /> : <UserQuizSearchBar />}
      <ProfileDropdown />
    </div>
  );
};

export default DashboardTopBar;