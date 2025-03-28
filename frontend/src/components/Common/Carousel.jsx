import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from './QuizCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ title, quizzes, onViewAll }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
    }
    return () => {
      carousel?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  useEffect(() => {
    // Recheck scroll status when quizzes change
    checkScroll();
  }, [quizzes]);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cardWidth = container.querySelector('.quiz-card-wrapper')?.offsetWidth || 300;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const quizClick = (id) => {
    console.log(id)
    navigate(`/user/play-quiz/${id}`);
  };

  const NavigationArrow = ({ direction }) => {
    const isLeft = direction === 'left';
    const show = isLeft ? showLeftArrow : showRightArrow;
    
    return (
      <button
        onClick={() => scroll(direction)}
        className={`absolute top-1/2 -translate-y-1/2 z-30
          ${isLeft ? 'left-2' : 'right-2'}
          ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          bg-white/90 hover:bg-white
          p-2 rounded-full shadow-lg
          transform transition-all duration-200 ease-in-out
          hover:scale-110 group
          focus:outline-none focus:ring-2 focus:ring-purple-500
          md:p-3`}
        aria-label={`Scroll ${direction}`}
      >
        {isLeft ? (
          <ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
        ) : (
          <ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900" />
        )}
      </button>
    );
  };

  return (
    <div className="relative w-full md:px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <button 
          onClick={onViewAll}
          className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
        >
          View All
        </button>
      </div>

      <div className="relative group">
        <NavigationArrow direction="left" />
        <NavigationArrow direction="right" />

        <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none
          ${showLeftArrow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
        <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none
          ${showRightArrow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scroll-smooth pb-4 pt-2
            scrollbar-none hover:scrollbar-thin hover:scrollbar-track-gray-100 hover:scrollbar-thumb-gray-300"
        >
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.quizId}
                onClick={() => quizClick(quiz._id)}
                className="quiz-card-wrapper flex-none transform transition-transform duration-300 hover:scale-[1.02] cursor-pointer
                  min-w-[250px] w-[240px]
                  md:min-w-[280px] md:w-[280px]
                  lg:min-w-[280px] lg:w-[280px]
                  xl:min-w-[280px] xl:w-[280px]"
              >
                <QuizCard {...quiz} />
              </div>
            ))
          ) : (
            <div className="flex-1 text-center py-8 text-gray-500">
              No quizzes available in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carousel;