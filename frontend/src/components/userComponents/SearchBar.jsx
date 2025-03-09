import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import quizData from '../../constants/quizData';

const SearchBar = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const allQuizes = quizData.allQuizzes;

  const getSearchResults = (query) => {
    setSearchTitle(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const results = allQuizes.filter(quiz => 
      quiz.title.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    setShowDropdown(true);
  };

  const handleQuizSelect = (quizId) => {
    setShowDropdown(false);
    setSearchTitle('');
    navigate(`/user/play-quiz/${quizId}`);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      {/* Search Container - Always visible on all screens */}
      <div className="flex">
        <form 
          className="w-[180px] md:w-[400px] lg:w-[400px]" 
          onSubmit={(e) => e.preventDefault()}
        >   
          <div className="relative">
            <div className="absolute z-50 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="search"
              value={searchTitle}
              onChange={(e) => getSearchResults(e.target.value)}
              className="block w-full p-2.5 ps-10 text-sm    rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search Quiz Title"
            />
            {/* <button 
              type="submit" 
              className="text-white absolute end-1 top-1 bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1.5 transition-colors duration-200"
            >
             <span className='text-sm'> Search</span>
            </button> */}
          </div>
        </form>
      </div>

      {/* Dropdown Results - Visible on all screens when there are results */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute top-full right-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {searchResults.map((quiz) => (
            <div
              key={quiz.quizId}
              onClick={() => handleQuizSelect(quiz.quizId)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            >
              <p className="text-sm text-gray-900">{quiz.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;