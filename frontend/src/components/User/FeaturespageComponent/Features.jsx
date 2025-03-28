import React from 'react';
import { PenSquare, PlayCircle, Trophy, Users } from 'lucide-react';
import {FeaturesData} from '../../../constants/index'
const Features = () => {
 

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
        {FeaturesData.map((feature, index) => (
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