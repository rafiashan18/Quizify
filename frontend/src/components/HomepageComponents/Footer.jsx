import React from 'react';
import {
  BookOpen,
  Trophy,
  Users,
  CreditCard,
  Mail,
  Github,
  X,
  Linkedin,
  Instagram
} from 'lucide-react';
import { useNavigate , Link } from 'react-router-dom';
const Footer = () => {
  const navigate = useNavigate()
  return (
    <footer className="bg-purple-900 text-purple-200">

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Quizify</h3>
            <p className="text-sm text-purple-200">
              Create, play, and share engaging quizzes. Join our community of learners and quiz enthusiasts.
            </p>
            <div className="flex space-x-4">

              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                < X className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>



          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/demo-quiz" className="hover:text-white transition-colors">Demo Quiz</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
              </li>
            </ul>
          </div>

          {/* <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Features</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Create Quiz</a>
              </li>
              <li className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Leaderboard</a>
              </li>
              <li className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Community</a>
              </li>
              <li className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <a href="#" className="hover:text-white transition-colors">Pro Features</a>
              </li>
            </ul>
          </div> */}


        


          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-sm text-purple-200">Subscribe to our newsletter for updates and new features.</p>
            <div className="flex  flex-wrap gap-2   items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-purple-800 text-white px-4 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 m-0 rounded-lg transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="border-t border-purple-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-purple-200">
              © {new Date().getFullYear()} Quizify. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              {/* <a href="#" className="hover:text-white transition-colors">Cookie Policy</a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;