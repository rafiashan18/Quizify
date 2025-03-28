import React, { useState, useEffect } from 'react';
import { 
  Home, Activity, BookPlus, 
  Settings, ChevronLeft, ChevronRight, 
  LogOut, Book, Users, FileText, 
  BarChart, UserIcon, MessageCircle, Menu 
} from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice';

const Sidebar = () => {
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user info from Redux store
  const { user } = useSelector(state => state.auth);
  const isAdmin = user?.role === 'admin';
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location]);

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
    { icon: MessageCircle, text: 'Messages', path: '/admin/messages' }
  ];

  // User menu items
  const userMenuItems = [
    { icon: Home, text: 'Dashboard', path: '/user/' },
    { icon: Activity, text: 'Available Quizes', path: '/user/available-quizes' },
    { icon: BookPlus, text: 'Played Quizes', path: '/user/quiz-history' },
  ];

  // Select menu items based on user role
  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  // Render menu items
  const renderMenuItems = (collapsed = false) => (
    menuItems.map((item) => {
      const isActive = location.pathname === item.path;
      const Icon = item.icon;
      
      return (
        <Link
          key={item.path}
          to={item.path}
          className={`
            flex items-center px-4 py-3 cursor-pointer
            transition-colors duration-200 no-underline
            ${isActive 
              ? 'bg-purple-50 border-r-4 border-purple-500 text-purple-600' 
              : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}`}
        >
          <Icon size={20} className={isActive ? 'text-purple-500' : ''} />
          {!collapsed && (
            <span className={`ml-4 ${isActive ? 'text-purple-600 font-medium' : ''}`}>
              {item.text}
            </span>
          )}
        </Link>
      );
    })
  );

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button 
        onClick={() => setIsMobileSidebarOpen(true)}
        className="md:hidden fixed top-4  toggle-zIndex  left-4 z-50 bg-purple-100 text-purple-600 rounded-full p-2 hover:bg-purple-200"
      >
        <Menu size={24} />
      </button>

      {/* Desktop Sidebar */}
      <div 
        className={`
          hidden md:block h-full bg-white text-gray-700 
          transition-all duration-300 ease-in-out shadow-lg
          fixed left-0 top-0 bottom-0
          ${isDesktopSidebarCollapsed ? 'w-16' : 'w-56'}
        `}
      >
        {/* Toggle Button */}
        
        {/* <button
          onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
          className="absolute toggle-zIndex top-6 -right-3 z-50 bg-purple-100 text-purple-600 rounded-full p-1 hover:bg-purple-200 transition-colors"
        >
          {isDesktopSidebarCollapsed ? 
            <ChevronRight size={16} /> : 
            <ChevronLeft size={16} />
          }
        </button> */}

        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          {!isDesktopSidebarCollapsed && (
            <h1 className="text-xl font-bold text-purple-600">
              {isAdmin ? 'Admin Panel' : 'Dashboard'}
            </h1>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          {renderMenuItems(isDesktopSidebarCollapsed)}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[100] md:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div 
            className="w-64 h-full bg-white shadow-lg transform translate-x-0 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 bg-purple-100 text-purple-600 rounded-full p-2 hover:bg-purple-200"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Logo Area */}
            <div className="h-16 flex items-center justify-center border-b border-gray-100">
              <h1 className="text-xl font-bold text-purple-600">
                {isAdmin ? 'Admin Panel' : 'Dashboard'}
              </h1>
            </div>

            {/* Navigation Menu */}
            <nav className="mt-8">
              {renderMenuItems()}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;