import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/Slices/themeSlice';
import SearchBar from './SearchBar';
import ProfileLogout from './ProfileLogout';

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
    <div className=' flex md:justify-end justify-center items-center w-full border gap-3  text-gray-900  border-b rounded-sm border-gray-300 p-4   dark:border-gray-600 dark:bg-gray-900 dark:text-white'>
      
       

        <SearchBar/>
        <ProfileLogout/>
      
      {/* <button className='justify-self-end text-2xl text-dark' onClick={handleToggle}>
        {isDarkMode ? <Sun /> : <Moon />}
      </button> */}
    </div>
  );
};

export default Navbar;
