import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  Brain,
  ChevronRight,
  Target,
  CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuizHistoryCard from '../../../components/UserDashboard/QuizHistoryCard';
import { getLatestQuizzes, getUserProgressStats } from '../../../services/UserProgressApi';

const UserDashboardScreen = () => {
  const [dashboardStats, setDashboardStats] = useState({
    uniqueQuizCount: 0,
    totalQuestions: 0,
    totalCorrectAnswers: 0,
    bestPerformance: "0%"
  });
  const [latestQuizzes, setLatestQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userStats = await getUserProgressStats();
        setDashboardStats(userStats);
        
        const latestQuizzesData = await getLatestQuizzes(3);
        setLatestQuizzes(latestQuizzesData);
        // console.log(latestQuizzes)
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const userDashboardStats = [
    {
      icon: <BookOpen className="w-6 h-6 text-purple-600" />,
      title: "Unique Quizes Taken",
      value: dashboardStats.uniqueQuizCount,
      bgColor: "bg-purple-100"
    },
    {
      icon: <Target className="w-6 h-6 text-yellow-600" />,
      title: "Total Questions",
      value: dashboardStats.totalQuestions,
      bgColor: "bg-yellow-100"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Correct Answers",
      value: dashboardStats.totalCorrectAnswers,
      bgColor: "bg-green-100"
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Best Performance",
      value: dashboardStats.bestPerformance,
      bgColor: "bg-orange-100"
    }
  ];

  const getLatestQuiz = () => {
    if (latestQuizzes.length === 0) return null;
    return latestQuizzes[0];
  };

  const latestQuiz = getLatestQuiz();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-purple-600">Loading dashboard data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 md:p-6 p-2">
      {error && (
        <div className="max-w-6xl mx-auto mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 md:p-12 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to Quizify
          </h1>
          <p className="text-purple-100 text-lg max-w-xl mb-6">
            Challenge yourself with our diverse range of quizzes. Track your progress, 
            compete with others, and enhance your knowledge through interactive learning.
          </p>
          {latestQuiz && (
            <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm">
              <p className="text-white text-sm mb-2">Latest Quiz Completed:</p>
              <p className="text-white font-semibold">{latestQuiz.quizTitle}</p>
              <p className="text-purple-100">
                Score: {latestQuiz.score}/{latestQuiz.totalQuestions} 
                ({((latestQuiz.score / latestQuiz.totalQuestions) * 100).toFixed(0)}%)
              </p>
            </div>
          )}
          <button 
            onClick={() => navigate('/user/available-quizes')}
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200">
            Start a New Quiz
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* userDashboardStats Grid */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userDashboardStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center gap-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-gray-600 text-sm">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quiz History Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Your Quiz History
          </h2>
          {latestQuizzes.length > 0 && (
            <p className="text-purple-600">
              Recent Attempts: {latestQuizzes.length}
            </p>
          )}
        </div>
        {latestQuizzes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <Brain className="w-12 h-12 text-purple-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Quizzes Attempted Yet</h3>
            <p className="text-gray-600 mb-6">Take your first quiz to start building your history!</p>
            <button
              onClick={() => navigate('/user/available-quizes')}
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-200">
              Browse Quizzes
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3'>
              {latestQuizzes.map((quiz, index) => (
              
                <QuizHistoryCard key={index} quizProgress={quiz} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardScreen;