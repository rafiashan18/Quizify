import React from 'react'
import Carousel from '../commonComponents/Carousel'
import quizData from '../../constants/quizData';
const QuizDisplay = () => {
    const popularQuizzes = quizData.getPopularQuizzes();
    const categories = quizData.getAllCategories();
    // console.log(popularQuizzes)
    return (
      <div className="space-y-8">
       
        <Carousel 
          title="Popular Quizzes" 
          quizzes={popularQuizzes}
        />
              
        {/* {categories.map(category => (
          <Carousel
            key={category}
            title={`${category} Quizzes`}
            quizzes={quizData.getQuizzesByCategory(category)}
          />
        ))} */}
      </div>
    );
  };

export default QuizDisplay