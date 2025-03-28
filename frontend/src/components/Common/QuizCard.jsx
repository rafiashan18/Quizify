import React from 'react';

const QuizCard = ({ 
  title, 
  category, 
  difficulty, 
  description, 
  coverImage, 
  duration, 
  totalQuestions,
  attempts
}) => {

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800'
    };

    return colors[difficulty.toLowerCase()] || colors.medium;
  };

  return (
    <div className="w-52 sm:w-56 md:w-64  rounded-xl overflow-hidden hover:cursor-pointer bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
       {/* Badge   */}
        <span className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
          
        </span>
      </div>

      {/* Content Section */}
      <div className="px-5 py-3 ">
        {/* Category  + Questions*/}
       <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3'>
       <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 ">
          {category}
          
        </span>
        <div className="flex items-center gap-1">
          
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>{totalQuestions} questions</span>
          </div>
       </div>
        {/* Title */}
        <p className="text-lg font-semibold hover:underline text-gray-900 dark:text-gray-100 mb-2  line-clamp-1">
          {title}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {description}
        </p>

        {/* Quiz Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          {/* <div className="flex items-center gap-1">
           
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{duration} min</span>
          </div> */}
         
          {/* <div className="flex items-center gap-1">
           
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{attempts} attempts</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;