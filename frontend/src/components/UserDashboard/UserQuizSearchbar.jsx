import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Common/SearchBar';
import { searchQuizzes } from '../../services/QuizApi';

const UserQuizSearchBar = () => {
  const navigate = useNavigate();
  
  const fetchQuizResults = async (query) => {
    try {
      const results = await searchQuizzes(query);
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };
  
  const handleQuizSelect = (quiz) => {
    navigate(`/user/play-quiz/${quiz._id}`);
  };

  return (
    <SearchBar
      fetchResults={fetchQuizResults}
      placeholder="Search Quiz Title"
      onResultSelect={handleQuizSelect}
      displayKey="title" 
      minSearchLength={2}
    />
  );
};

export default UserQuizSearchBar;