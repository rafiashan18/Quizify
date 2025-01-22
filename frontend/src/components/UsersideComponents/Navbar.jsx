import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/Slices/themeSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleToggle = () => {
    dispatch(toggleTheme());
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className='bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
      <h1>Dashboard</h1>
      <button className='text-2xl text-dark' onClick={handleToggle}>
        {isDarkMode ? <Sun /> : <Moon />}
      </button>
    </div>
  );
};

export default Navbar;
