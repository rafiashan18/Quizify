import React from 'react';
import { User, Mail, Trophy, Book, Calendar, X } from 'lucide-react';

const UserDetailsModal = ({ user , onClose }) => {
  // Provide default values for all potentially missing fields
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
    },
    quizzesTaken: user?.quizzesTaken || 0,
    quizzesPassed: user?.quizzesPassed || 0,
    quizHistory: user?.quizHistory || []
  };

  const passRate = defaultUser.quizzesTaken > 0 
    ? ((defaultUser.quizzesPassed / defaultUser.quizzesTaken) * 100).toFixed(0) 
    : '0';

  const formattedDate = defaultUser.createdAt 
    ? new Date(defaultUser.createdAt).toLocaleDateString() 
    : 'N/A';

  const avatarSrc = defaultUser.profilePicture === 'default.jpg' 
    ? '/uploads/profiles/default.jpg' 
    : defaultUser.profilePicture;

  return (
      <div className="fixed inset-0 z-50 overflow-auto">
          <div className="min-h-screen px-4 text-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
    
            <div className="inline-block rounded-2xl overflow-hidden w-full max-w-4xl my-8 text-left align-middle transition-all transform">
              <div className="relative bg-white rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 text-gray-600 hover:text-purple-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-8 h-8" />
                </button>
   <div className=' bg-white'>
     <div className=" grid md:grid-cols-3 gap-6 p-8">
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
          
          {/* 
          <div className="flex justify-center space-x-4 mt-4">
            <a 
              href={defaultUser.socialLinks.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              LinkedIn
            </a>
            <a 
              href={defaultUser.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-600"
            >
              Twitter
            </a>
          </div>
          */}
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

        {/* Quiz Performance - Will be displayed when implemented */}
        <div>
          <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
            Quiz Performance
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Trophy className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-sm text-gray-500">Quizzes Taken</p>
              <p className="text-2xl font-bold text-green-800">{defaultUser.quizzesTaken}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <Book className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-sm text-gray-500">Quizzes Passed</p>
              <p className="text-2xl font-bold text-green-800">{defaultUser.quizzesPassed}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <User className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <p className="text-sm text-gray-500">Pass Rate</p>
              <p className="text-2xl font-bold text-green-800">{passRate}%</p>
            </div>
          </div>
        </div>

        {defaultUser.quizHistory.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
              Recent Quiz History
            </h3>
            <div className="space-y-2">
              {defaultUser.quizHistory.map((quiz, index) => (
                <div 
                  key={quiz.id || index} 
                  className="bg-purple-50 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{quiz.title}</p>
                    <p className="text-sm text-gray-500">{quiz.dateTaken}</p>
                  </div>
                  <span className="font-bold text-purple-600">{quiz.score}%</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2 mb-4">
              Recent Quiz History
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