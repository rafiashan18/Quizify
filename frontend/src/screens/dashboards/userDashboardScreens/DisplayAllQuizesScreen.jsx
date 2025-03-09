import React, { useState } from 'react';
import Carousel from '../../../components/commonComponents/Carousel';
import quizData from '../../../constants/quizData';
import CategorySlider from '../../../components/userComponents/CategorySlider';

const DisplayAllQuizesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  // getQuizzesByDifficulty
  const getQuizzesByDifficulty = (category, difficulty) => {
    return quizData.allQuizzes.filter(quiz =>
      quiz.category === category &&
      quiz.difficulty === difficulty
    );
  };

  // popular quizzes (category wise)
  const getPopularQuizzesByCategory = (category) => {
    return quizData.allQuizzes
      .filter(quiz => quiz.category === category)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
  };

  // Get most recent quizzes
  const getMostRecentQuizzes = (category) => {
    return quizData.allQuizzes
      .filter(quiz => quiz.category === category)
      .slice(-10);
  };

  const handleCategoryClick = (category) => {
    if (category === "all") {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category === selectedCategory ? null : category);
    }
  };
  
  const getFilteredQuizzes = () => {
    if (!selectedCategory) return quizzes;
    return quizzes.filter(quiz => quiz.category === selectedCategory);
  };

  const renderCarouselSection = (title, quizzes) => {
    if (quizzes && quizzes.length > 0) {
      return (
        <div className="mb-8">
          <Carousel title={title} quizzes={quizzes} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative ">
      <div className="z-40 bg-white shadow-sm">
        <CategorySlider onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
      </div>

      <div className="p-4">
        {!selectedCategory ? (

          <>
            {renderCarouselSection(
              "Popular Quizzes",
              quizData.allQuizzes.sort((a, b) => b.popularity - a.popularity).slice(0, 10)
            )}
            {quizData.getAllCategories().map(category => {
              const categoryQuizzes = quizData.allQuizzes.filter(quiz => quiz.category === category);
              return categoryQuizzes.length > 0 ? (
                <div key={category} className="mb-8">
                  <Carousel title={`${category} Quizzes`} quizzes={categoryQuizzes} />
                </div>
              ) : null;
            })}
          </>
        ) : (
          <>
            {renderCarouselSection(
              `Popular ${selectedCategory} Quizzes`,
              getPopularQuizzesByCategory(selectedCategory)
            )}
            {renderCarouselSection(
              `Hard ${selectedCategory} Quizzes`,
              getQuizzesByDifficulty(selectedCategory, 'hard')
            )}
            {renderCarouselSection(
              `Medium ${selectedCategory} Quizzes`,
              getQuizzesByDifficulty(selectedCategory, 'medium')
            )}
            {renderCarouselSection(
              `Easy ${selectedCategory} Quizzes`,
              getQuizzesByDifficulty(selectedCategory, 'easy')
            )}
            {renderCarouselSection(
              `Most Recent ${selectedCategory} Quizzes`,
              getMostRecentQuizzes(selectedCategory)
            )}
          </>
        )}

        {selectedCategory && !quizData.allQuizzes.some(quiz => quiz.category === selectedCategory) && (
          <div className="text-center py-8 text-gray-500">
            No quizzes available for {selectedCategory} category yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayAllQuizesScreen;