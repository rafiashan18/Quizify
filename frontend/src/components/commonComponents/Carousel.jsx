import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizCard from './QuizCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({ title, quizzes }) => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!carouselRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth );
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    console.log(carousel)
    if (carousel) {
      carousel.addEventListener('scroll', checkScroll);
      checkScroll();
    }
    return () => carousel?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const quizClick = (id) => {
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
    <div className="relative md:px-4 px-2 py-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
        <button

         className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
          View All
        </button>
      </div>

      {/* Carousel container */}
      <div className="relative group">
        <NavigationArrow direction="left" />
        <NavigationArrow direction="right" />

        {/* Gradient masks for scroll indication */}
        <div className={`absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none
          ${showLeftArrow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
        <div className={`absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none
          ${showRightArrow ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />

        {/* Carousel scroll container */}
        <div
          ref={carouselRef}
          className="flex gap-10 overflow-x-auto scroll-smooth pb-4 pt-2
            scrollbar-none hover:scrollbar-thin hover:scrollbar-track-gray-100 hover:scrollbar-thumb-gray-300
            snap-x snap-mandatory"
        >
          {quizzes.map((quiz) => (
            <div
              key={quiz.quizId}
              onClick={() => quizClick(quiz.quizId)}
              className="flex-none snap-start transform transition-transform duration-300 hover:scale-[1.02]
                first:ml-6 last:mr-6 cursor-pointer"
              style={{ width: 'calc(100% - 2rem)' }}
            >
              <QuizCard {...quiz} />
            </div>
          ))}
        </div>
      </div>

      
  
    </div>
  );
};

export default Carousel;