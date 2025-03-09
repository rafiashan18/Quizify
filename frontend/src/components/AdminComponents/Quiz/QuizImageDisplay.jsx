// QuizImageDisplay.jsx
import React, { useState } from 'react';

const QuizImageDisplay = ({ imageUrl, altText }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  
  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  };

  return (
    <div className="relative">
      {/* Regular image display */}
      <div 
        className="md:w-full h-64 cursor-pointer" 
        onClick={toggleZoom}
        title="Click to zoom"
      >
        <img 
          src={imageUrl || 'https://via.placeholder.com/600x400?text=No+Cover+Image'} 
          alt={altText || 'Quiz cover'}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Zoomed modal overlay */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={toggleZoom}
          onKeyDown={handleKeyPress}
          tabIndex="0"
        >
          <div className="relative max-w-4xl max-h-screen">
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200"
              onClick={toggleZoom}
              aria-label="Close zoom view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img 
              src={imageUrl || 'https://via.placeholder.com/600x400?text=No+Cover+Image'} 
              alt={altText || 'Quiz cover (zoomed)'}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizImageDisplay;