import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ 
  fetchResults, // Function to fetch search results from API
  searchKey = 'title',
  placeholder = 'Search...',
  onResultSelect,
  minSearchLength = 1,
  displayKey = 'title',
  width = "w-[180px] md:w-[400px] lg:w-[400px]",
  renderResultItem,
  debounceTime = 300 // Adding debounce to prevent excessive API calls
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const handleSearch = async (query) => {
    setSearchTerm(query);
    
    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    if (query.trim().length < minSearchLength) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    
    // Set debounce timer for search
    debounceTimerRef.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        const results = await fetchResults(query);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, debounceTime);
  };

  const handleItemSelect = (item) => {
    setShowDropdown(false);
    setSearchTerm('');
    onResultSelect(item);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Default item renderer if custom one is not provided
  const defaultRenderResultItem = (item) => (
    <div
      key={item._id || Math.random().toString(36)}
      onClick={() => handleItemSelect(item)}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
    >
      <p className="text-sm text-gray-900">{item[displayKey] || item.quizTitle}</p>
    </div>
  );

  return (
    <div ref={searchRef} className="relative">
      {/* Search Container - Always visible on all screens */}
      <div className="flex">
        <form 
          className={width}
          onSubmit={(e) => e.preventDefault()}
        >   
          <div className="relative">
            <div className="absolute z-50 inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full p-2.5 ps-10 text-sm rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
              placeholder={placeholder}
            />
          </div>
        </form>
      </div>

      {/* Dropdown Results - Visible when there are results */}
      {showDropdown && (
        <div className="absolute top-full right-0 z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {isLoading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((item) => (
              renderResultItem ? renderResultItem(item, handleItemSelect) : defaultRenderResultItem(item)
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;