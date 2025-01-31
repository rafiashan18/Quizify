import React from 'react';
import quizData from '../../constants/quizData';

const CategorySlider = ({ onCategoryClick, selectedCategory }) => {
  const data = quizData.getAllCategoryAndImages();

  return (
    <div className="relative">
      <div className="flex justify-around overflow-x-auto gap-4 p-4 z-40 bg-white dark:bg-gray-950">
        {data.map((cat, index) => (
          <div
            onClick={() => onCategoryClick(cat.category === selectedCategory ? null : cat.category)}
            key={index}
            className={`flex-shrink-0 relative group cursor-pointer transition-all duration-300 hover:scale-105 
              ${cat.category === selectedCategory ? 'scale-110' : ''}`}
          >
            <div className="flex flex-col items-center">
              <img
                src={cat.image}
                alt={cat.category}
                className={`w-9 h-9 object-cover rounded-lg shadow-md 
                  ${cat.category === selectedCategory ? 'ring-2 ring-purple-500' : ''}`}
              />
              <div className={`mt-2 text-center text-sm font-medium 
                ${cat.category === selectedCategory ? 'text-purple-600' : 'text-gray-700 dark:text-white'}`}>
                {cat.category}
              </div>
            </div>
            <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-purple-500 
              ${cat.category === selectedCategory ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              transition-opacity duration-300`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;