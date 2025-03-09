import React, { useState, useEffect } from 'react';
import { Home, Activity, BookPlus, Settings, ChevronLeft, ChevronRight, LogOut,Book, Users, FileText, BarChart, UserIcon } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user info from Redux store
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';
  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('Token');
    navigate('/login');
  };

  // Admin menu items
  const adminMenuItems = [
      { icon: Home, text: 'Dashboard', path: '/admin/' },
    { icon: Activity, text: 'Create Quizes', path: '/admin/create-quiz' },
    { icon: UserIcon, text: 'View Users', path: '/admin/view-users' },
    { icon: Book, text: 'Display Quizes', path: '/admin/display-quizes' },
    // { icon: Book, text: 'Settings', path: '/admin/settings' },
    // { icon: LogOut, text: 'Logout', path: '/', action: handleLogout },
  ];

  // User menu items
  const userMenuItems = [
    { icon: Home, text: 'Dashboard', path: '/user/' },
    { icon: Activity, text: 'Available Quizes', path: '/user/available-quizes' },
    { icon: BookPlus, text: 'Played Quizes', path: '/user/quiz-history' },
    // { icon: Settings, text: 'Settings', path: '/user/settings' },
    // { icon: LogOut, text: 'Logout', path: '/', action: handleLogout },
  ];

  // Select menu items based on user role
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div 
      className={`h-full bg-white text-gray-700 transition-all duration-300 ease-in-out shadow-lg
        ${isCollapsed ? 'w-16' : 'w-56'}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-6 -right-3 z-50 bg-purple-100 text-purple-600 rounded-full p-1 hover:bg-purple-200 transition-colors"
      >
        {isCollapsed ? 
          <ChevronRight size={16} /> : 
          <ChevronLeft size={16} />
        }
      </button>

      {/* Logo Area */}
      <div className="h-16 flex items-center justify-center border-b border-gray-100">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-purple-600">
            {isAdmin ? 'Admin Panel' : 'Dashboard'}
          </h1>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.action ? item.action : null}
              className={`
                flex items-center px-4 py-3 cursor-pointer
                transition-colors duration-200 no-underline
                ${isActive 
                  ? 'bg-purple-50 border-r-4 border-purple-500 text-purple-600' 
                  : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
            >
              <Icon size={20} className={isActive ? 'text-purple-500' : ''} />
              {!isCollapsed && (
                <span className={`ml-4 ${isActive ? 'text-purple-600 font-medium' : ''}`}>
                  {item.text}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      {/* <div className="absolute bottom-0 w-full border-t border-gray-100 p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-purple-100"></div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
              <p className="text-xs font-medium text-purple-500">{isAdmin ? 'Administrator' : 'User'}</p>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;