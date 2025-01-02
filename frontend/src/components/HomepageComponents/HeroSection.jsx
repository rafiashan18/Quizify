import React from 'react';
import backgroundImage from '../../assets/images/background.jpg'
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen">
      <div 
        className="hero-wrapper relative h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:  `url(${backgroundImage})` 
        }}
      >
        <div className="absolute inset-0 bg-black/5" /> {/* Overlay */}
        
        <div className="hero-text-wrapper relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl pl-7 text-white">
            <h1 className="text-5xl md:text-6xl font-bold  mb-6">
              Challenge Your Knowledge with Fun Quizzes!
            </h1>
            
            <p className="text-xl md:text-2xl mb-8">
              Create, Play, and Share Quizzes Effortlessly
            </p>
            
            <div className="space-x-4">
              <button onClick={()=> navigate("/signup")} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-xl font-bold">
                Play Today
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;