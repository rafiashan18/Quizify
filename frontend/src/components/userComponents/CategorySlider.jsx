import cat1 from '../../assets/images/categoryIcons/art-and-literature.svg'

import cat2 from '../../assets/images/categoryIcons/geography.svg'
import cat3 from '../../assets/images/categoryIcons/history.svg'
import cat4 from '../../assets/images/categoryIcons/languages.svg'
import cat5 from '../../assets/images/categoryIcons/science-and-nature.svg'
import cat6 from '../../assets/images/categoryIcons/sports.svg'
import cat7 from '../../assets/images/categoryIcons/trivia.svg'
import React from 'react';

const categoryData = [
  {
    category: "all",
    image: null, // You might want to add an "all" icon later
    displayName: "All Categories"
  },
  {
    category: "Art",
    image: cat1,
    displayName: "Art & Literature"
  },
  {
    category: "Geography",
    image: cat2,
    displayName: "Geography"
  },
  {
    category: "History",
    image: cat3,
    displayName: "History"
  },
  {
    category: "Languages",
    image: cat4,
    displayName: "Languages"
  },
  {
    category: "Science",
    image: cat5,
    displayName: "Science & Nature"
  },
  {
    category: "Sports",
    image: cat6,
    displayName: "Sports"
  },
  {
    category: "Trivia",
    image: cat7,
    displayName: "Trivia"
  }
];

const CategorySlider = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className=''>
      <div className="flex justify-around overflow-x-auto py-4 scrollbar-hide">
        {categoryData.map((cat, index) => (
          <div
            onClick={() => {
             
              if (cat.category === "all") {
                onCategoryClick("all");
              } else {
                onCategoryClick(cat.category === selectedCategory ? null : cat.category);
              }
            }}
            key={index}
            className={`flex-shrink-0 flex relative group cursor-pointer transition-all duration-300 hover:scale-105
              ${cat.category === selectedCategory || (cat.category === "all" && selectedCategory === null) ? 'scale-110' : ''}`}
          >
            <div className="flex flex-col items-center justify-center px-3 py-1 rounded-lg hover:shadow-md">
              {cat.image && <img src={cat.image} alt={cat.displayName} className="w-6 h-6 mb-2" />}
              <span className="text-sm font-medium text-purple-900">
                {cat.displayName}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySlider;