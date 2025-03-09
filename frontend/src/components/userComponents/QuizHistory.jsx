import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizHistoryCard from './QuizHistoryCard';

const QuizHistory = () => {
  const quizesHistory = useSelector(state => state.playQuiz.quizesHistory);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(quizesHistory);
  }, [quizesHistory]);

  const handlePlayQuiz = () => {
    navigate('/user/available-quizes'); // Adjust this route according to your application
  };

  return (
    <div className="p-2 md:p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quiz History</h1>
        <button
          onClick={handlePlayQuiz}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Start New Quiz
        </button>
      </div>

      {quizesHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 text-lg">
            You haven't taken any quizzes yet
          </p>
          <button
            onClick={handlePlayQuiz}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Take Your First Quiz
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-7">
          {quizesHistory.map((quizHistory, index) => (
            <QuizHistoryCard key={index} quizHistory={quizHistory} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistory;