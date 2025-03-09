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

  // Function to handle navigation and closing the menu
  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="   bg-white border-b border-purple-100 shadow-sm  w-full fixed top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-800">Quizify</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center lg:ms-40 space-x-8">
            <NavLink to="/" style={navLinkStyles} className=" hover:text-purple-800"><span className='text-base'>Home</span></NavLink>
            <NavLink to="/features" style={navLinkStyles} className="hover:text-purple-800 "> <span className='text-base'>Feature</span></NavLink>
            <NavLink to="/about-us" style={navLinkStyles} className="hover:text-purple-800"><span className='text-base'>About Us</span></NavLink>
            <NavLink to="/contact-us" style={navLinkStyles} className="hover:text-purple-800"><span className='text-base'>Contact Us</span></NavLink>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center space-x-2 bg-purple-600 text-white lg:px-4 lg:py-2 px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
              <User className="lg:w-5 lg:h-5 w-4" />
              <span className='text-sm'>Sign Up</span>
            </button>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 text-purple-600 bg-white lg:px-4 lg:py-2 px-2 py-2 rounded-lg hover:bg-purple-700 hover:text-white
            transition-colors duration-300 ease-in-out border-2 border-purple-600">
              <LogIn className="lg:w-5 lg:h-5 w-4" />
              <span className='text-sm'>Log In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-purple-600 transition-colors duration-300 hover:text-purple-800">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Container - Always present but with height/opacity transitions */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen 
              ? "max-h-96 opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4">
            <NavLink 
              to="/" 
              style={navLinkStyles} 
              className="hover:text-purple-800 block transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/features" 
              style={navLinkStyles} 
              className="hover:text-purple-800 block transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Feature
            </NavLink>
            <NavLink 
              to="/about-us" 
              style={navLinkStyles} 
              className="hover:text-purple-800 block transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact-us" 
              style={navLinkStyles} 
              className="hover:text-purple-800 block transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </NavLink>           

            <div className=' flex gap-3'>
            <button
              onClick={() => handleNavigation("/signup")}
              className="flex items-center space-x-2 bg-purple-600 text-white lg:px-4 lg:py-2 px-2 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
              <User className="lg:w-5 lg:h-5 w-4" />
              <span className='text-sm'>Sign Up</span>
            </button>
            <button
              onClick={() => handleNavigation("/signup")}
              className="flex items-center space-x-2 text-purple-600 bg-white lg:px-4 lg:py-2 px-2 py-2 rounded-lg hover:bg-purple-700 hover:text-white
            transition-colors duration-300 ease-in-out border-2 border-purple-600">
              <LogIn className="lg:w-5 lg:h-5 w-4" />
              <span className='text-sm'>Log In</span>
            </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;