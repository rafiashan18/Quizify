import React from 'react';
import { User, Mail, Trophy, Book, Calendar, X, Clock, Award, BarChart2 } from 'lucide-react';

const UserDetailsModal = ({ user, userProgress, onClose }) => {
  const defaultUser = {
    name: user?.name || 'User Name',
    email: user?.email || 'email@example.com',
    username: user?.username || 'username',
    profilePicture: user?.profilePicture || 'default.jpg',
    bio: user?.bio || 'No bio available.',
    createdAt: user?.createdAt,
    status: user?.status || 'active',
    socialLinks: {
      linkedin: user?.socialLinks?.linkedin || '#',
      twitter: user?.socialLinks?.twitter || '#'
    }
  };

  // Process quiz data from userProgress
  const quizStats = React.useMemo(() => {
    if (!userProgress || userProgress.length === 0) {
      return {
        quizzesTaken: 0,
        quizzesPassed: 0,
        averageScore: 0,
        totalAttempts: 0,
        passRate: 0
      };
    }

    const quizzesTaken = userProgress.length;
    const quizzesPassed = userProgress.filter(quiz => 
      (quiz.score / quiz.totalQuestions) * 100 >= 70
    ).length;
    
    const totalScore = userProgress.reduce((sum, quiz) => 
      sum + ((quiz.score / quiz.totalQuestions) * 100), 0);
    
    const averageScore = (totalScore / quizzesTaken).toFixed(1);
    
    const totalAttempts = userProgress.reduce((sum, quiz) => 
      sum + (quiz.attempts || 1), 0);
    
    const passRate = quizzesTaken > 0 
      ? ((quizzesPassed / quizzesTaken) * 100).toFixed(0) 
      : '0';

    return {
      quizzesTaken,
      quizzesPassed,
      averageScore,
      totalAttempts,
      passRate
    };
  }, [userProgress]);

  const formattedDate = defaultUser.createdAt 
    ? new Date(defaultUser.createdAt).toLocaleDateString() 
    : 'N/A';

  const avatarSrc = defaultUser.profilePicture === 'default.jpg' 
    ? '/uploads/profiles/default.jpg' 
    : defaultUser.profilePicture;

  // Format date for quiz history
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="fixed inset-0 modal-zIndex overflow-auto">
      <div className="min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

        <div className="inline-block rounded-2xl overflow-hidden w-full max-w-4xl my-8 text-left align-middle transition-all transform">
          <div className="relative bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={onClose}
              className="fixed top-5 right-5 text-gray-600 hover:text-purple-600 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white">
              <div className="grid md:grid-cols-3 gap-6 p-8">
                {/* Profile Section */}
                <div className="md:col-span-1 flex flex-col items-center">
                  <div className="relative">
                    <img 
                      src={avatarSrc} 
                      alt={defaultUser.name} 
                      className="w-40 h-40 rounded-full object-cover border-4 border-purple-100 shadow-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + (user?._id || 'default');
                      }}
                    />
                  </div>

                  <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">{defaultUser.name}</h2>
                    <p className="text-gray-600 mt-2">@{defaultUser.username}</p>
                  </div>
                </div>

                {/* User Details Section */}
                <div className="md:col-span-2 space-y-6">
                  {/* Bio Section */}
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
                      Personal Bio
                    </h3>
                    <p className="text-gray-600">{defaultUser.bio}</p>
                  </div>

                  {/* User Information Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{defaultUser.email}</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-4">
                      <Calendar className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-500">Registered</p>
                        <p className="font-medium">{formattedDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quiz Performance with new metrics from userProgress */}
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
                      Quiz Analytics
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <Trophy className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                        <p className="text-sm text-gray-500">Quizzes Taken</p>
                        <p className="text-2xl font-bold text-blue-800">{quizStats.quizzesTaken}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <BarChart2 className="w-8 h-8 mx-auto text-green-600 mb-2" />
                        <p className="text-sm text-gray-500">Average Score</p>
                        <p className="text-2xl font-bold text-green-800">{quizStats.averageScore}%</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <Clock className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                        <p className="text-sm text-gray-500">Total Attempts</p>
                        <p className="text-2xl font-bold text-purple-800">{quizStats.totalAttempts}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quiz History Section */}
                  {userProgress && userProgress.length > 0 ? (
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
                        Quiz History
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {userProgress.map((quiz, index) => (
                          <div 
                            key={quiz._id || index} 
                            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-gray-800">{quiz.quizTitle || `Quiz #${quiz.quizId.slice(-5)}`}</p>
                                <p className="text-sm text-gray-500">{formatDate(quiz.attemptedAt)}</p>
                              </div>
                              <span className={`font-bold px-3 py-1 rounded-full text-sm ${
                                (quiz.score / quiz.totalQuestions) * 100 >= 70 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {quiz.score}/{quiz.totalQuestions} ({((quiz.score / quiz.totalQuestions) * 100).toFixed(0)}%)
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              <div className="text-xs bg-gray-100 p-2 rounded">
                                <span className="text-gray-500">Questions:</span> {quiz.totalQuestions}
                              </div>
                              <div className="text-xs bg-gray-100 p-2 rounded">
                                <span className="text-gray-500">Correct:</span> {quiz.correctAnswers}
                              </div>
                              {quiz.attempts && (
                                <div className="text-xs bg-gray-100 p-2 rounded">
                                  <span className="text-gray-500">Attempts:</span> {quiz.attempts}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
                        Quiz History
                      </h3>
                      <p className="text-gray-600 italic">No quiz history available.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;