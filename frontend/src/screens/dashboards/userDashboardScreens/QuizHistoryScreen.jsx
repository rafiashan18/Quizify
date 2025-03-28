import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizHistoryCard from '../../../components/UserDashboard/QuizHistoryCard';
import { getAllUserProgress } from '../../../services/UserProgressApi';
import { useSelector } from "react-redux";

const QuizHistoryScreen = () => {
  const navigate = useNavigate();
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 const authUserId = useSelector(state => state.auth.user._id)

  useEffect(() => {
    const fetchProgressList = async () => {
      try {
        setLoading(true);
        console.log(authUserId)
        const response = await getAllUserProgress(authUserId);
        setProgressList(response);
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching progress:', error);
        setError('Failed to load quiz history');
        setLoading(false);
      }
    };
    
    fetchProgressList();
  }, []);

  const handlePlayQuiz = () => {
    navigate('/user/available-quizes');
  };

  if (loading) {
    return (
      <div className="p-2 md:p-4 flex justify-center items-center h-64">
        <div className="text-purple-600 font-medium">Loading quiz history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 md:p-4 flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Try Again
        </button>
      </div>
    );
  }

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

      {progressList.length === 0 ? (
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-7">
          {progressList.map((quizProgress, index) => (
            <QuizHistoryCard key={index} quizProgress={quizProgress} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizHistoryScreen;