import React from 'react';
import { Home, Activity, Trophy, BookPlus, Settings, Gauge } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const menuItems = [
    { icon: Home, text: 'Dashboard', path: '/user/' },
    { icon: Activity, text: 'Activity', path: '/user/activity' },
    { icon: Trophy, text: 'Leaderboard', path: '/user/leaderboard' },
    // ********************************
    { icon: BookPlus, text: 'Create a Quiz', path: '/user/quiz' },
    { icon: Settings, text: 'Settings', path: '/user/settings' },
  ];
  const clicked = () => {
    console.log("clicked ")
  }
  return (
    <div
      className={`fixed top-0 left-0 h-screen
      transition-all duration-300 ease-in-out
      backdrop-blur-lg bg-white/30 dark:bg-gray-900
      border-r border-white/20 dark:border-gray-700
      shadow-lg flex flex-col
      w-16 md:w-64
      ${isDarkMode ? 'dark' : ''}`}
    >

      <div className="flex items-center gap-4 p-4 md:p-6">
        {/* <Gauge className="text-purple-600 dark:text-purple-400 w-6 h-6 md:w-8 md:h-8" /> */}
        <Link to="/"  className=" pl-2 hidden md:block font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Quizify
        </Link>
      </div>


      <nav className="flex-1 px-2 md:px-4 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.text}
           to={item.path}
            className="w-full flex items-center justify-center md:justify-start gap-4 p-3 md:p-4 mb-2
              rounded-lg transition-all duration-200
              hover:bg-purple-100 dark:hover:bg-darkPurple
              text-gray-700 dark:text-gray-200
              hover:text-purple-700 dark:hover:text-purple-300
              hover:border-purple-300 hover:border-b-2 
              hover:dark:border-purple-950 hover:dark:border-b-2 
              group relative"
          >

            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden md:block text-base">{item.text}</span>

            {/* Tooltip for mobile */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm
              rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
              pointer-events-none md:hidden">
              {item.text}
            </div>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
