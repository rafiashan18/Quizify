import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Common/SearchBar';
import { searchQuizzes } from '../../services/QuizApi';

const AdminQuizSearchBar = () => {
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
    navigate(`/admin/edit-quiz/${quiz._id}`);
  };

  const renderQuizItem = (quiz, onSelect) => (
    <div
      key={quiz._id}
      onClick={() => onSelect(quiz)}
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
    >
      <p className="text-sm font-medium text-gray-900">{quiz.title}</p>
      <p className="text-xs text-gray-500">
        {quiz.category && <span className="mr-2">Category: {quiz.category}</span>}
        {quiz.questions && <span>Questions: {quiz.questions.length}</span>}
      </p>
    </div>
  );

  return (
    <SearchBar
      fetchResults={fetchQuizResults}
      placeholder="Search Admin Quizzes"
      onResultSelect={handleQuizSelect}
      renderResultItem={renderQuizItem}
      minSearchLength={2}
    />
  );
};

export default AdminQuizSearchBar;