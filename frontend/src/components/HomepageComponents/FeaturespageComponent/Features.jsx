import React from 'react';
import { PenSquare, PlayCircle, Trophy, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: "Create Quizzes",
      icon: <PenSquare size={32} />,
      description: "With our intuitive quiz creation tool, users can easily design custom quizzes tailored to their interests or educational needs. The platform offers a variety of question types, including multiple choice, true/false, and fill-in-the-blank, allowing for creative and engaging quiz formats. Users can also add images and explanations to enhance the learning experience.",
      isDark: true
    },
    {
      title: "Play Quizzes",
      icon: <PlayCircle size={32} />,
      description: "Experience the thrill of interactive quizzes that challenge your knowledge across various subjects! Users can take quizzes created by others or participate in themed challenges that keep learning fun and engaging. The platform provides instant feedback on answers, allowing users to track their performance and learn from their mistakes.",
      isDark: false
    },
    {
      title: "Scoreboard and Leaderboard",
      icon: <Trophy size={32} />,
      description: "Our dynamic scoreboard feature allows users to track their scores in real time after completing quizzes. This competitive aspect motivates users to improve their knowledge and skills while enjoying friendly competition with friends and peers. The leaderboard showcases top performers, encouraging users to strive for higher rankings and celebrate their achievements.",
      isDark: false
    },
    {
      title: "Community Engagement",
      icon: <Users size={32} />,
      description: "Join a vibrant community of quiz enthusiasts where learning meets social interaction! Users can share their quizzes, discuss strategies, and provide feedback on each other's work. The platform fosters collaboration through comment sections and forums, making it easy to connect with like-minded individuals.",
      isDark: true
    }
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 py-16">
    
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Powerful Features for Quiz Enthusiasts
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a comprehensive suite of tools designed to make quiz creation, 
          participation, and community engagement both exciting and rewarding.
        </p>
      </div>

     
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`rounded-lg p-8 transition-transform hover:scale-105 ${
              feature.isDark 
                ? 'bg-purple-700 text-white' 
                : 'bg-white border-2 border-yellow-400 text-gray-800'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${
                feature.isDark 
                  ? 'text-yellow-400' 
                  : 'text-blue-500'
              }`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold ml-4">{feature.title}</h2>
            </div>
            <p className={`${
              feature.isDark 
                ? 'text-gray-200' 
                : 'text-gray-600'
            }`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;