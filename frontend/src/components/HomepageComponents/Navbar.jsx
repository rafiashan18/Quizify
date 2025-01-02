import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) => ({
    // textDecoration: isActive ? "underline" : "none",
    color: isActive ? "purple" : "purple",
    fontWeight: isActive ? "600" : "normal",
    fontSize: isActive ? "1rem" : "0.8rem"
  });

  return (
    <nav className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-800">Quizify</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" style={navLinkStyles} className="hover:text-purple-800">Home</NavLink>
            <NavLink to="/explore" style={navLinkStyles} className="hover:text-purple-800">Explore</NavLink>
            <NavLink to="/about-us" style={navLinkStyles} className="hover:text-purple-800">About Us</NavLink>
            <NavLink to="/contact-us" style={navLinkStyles} className="hover:text-purple-800">Contact Us</NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button className="p-2 text-purple-600 hover:text-purple-800 rounded-full">
              <Bell className="w-6 h-6" />
            </button> */}
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              <User className="w-5 h-5" />
              <span>Sign Up</span>
            </button>
            <button
              onClick={() => navigate("/login")}

              className="flex items-center space-x-2 text-purple-600 bg-white px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white
            transition-colors duration-300 ease-in-out  border-2 border-purple-600">
              <LogIn className="w-5 h-5" />

              <span>Log In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-purple-600">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <NavLink to="/" style={navLinkStyles} className="hover:text-purple-800 block">Home</NavLink>
            <NavLink to="/explore" style={navLinkStyles} className="hover:text-purple-800 block">Explore</NavLink>
            <NavLink to="/about-us" style={navLinkStyles} className="hover:text-purple-800 block">About Us</NavLink>

            <div className=''>
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 my-2 py-2 rounded-lg hover:bg-purple-700">
                <User className="w-5 h-5" />
                <span>Sign Up</span>
              </button>
              <button className="flex items-center space-x-2 text-purple-600 bg-white px-4 py-2 rounded-lg hover:bg-purple-700 hover:text-white
            transition-colors duration-300 ease-in-out  border-2 border-purple-600">
                <LogIn className="w-5 h-5" />

                <span>Log In</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;