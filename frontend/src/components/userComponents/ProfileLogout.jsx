import React, { useState, useRef, useEffect } from 'react';
import { Settings, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Slices/authSlice';
import { getUser } from '../../services/AuthApi'; 

const ProfileLogout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('Token');
    navigate('/login');
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-purple-400 hover:border-yellow-500 transition-all duration-200 overflow-hidden bg-white"
      >
        {user?.image ? (
          <img
            src={user.image }
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-5 w-5 text-purple-600" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && user && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full border-2 border-purple-400 overflow-hidden bg-purple-100">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-800">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="px-2 py-2">
            <Link
              to={`/${user?.role}/settings`}
              className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLogout;
