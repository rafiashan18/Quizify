import { categoryData } from "../../constants";

const CategorySlider = ({ onCategoryClick, selectedCategory }) => {
  return (
    <div className=''>
      <div className="flex justify-around  overflow-x-auto gap-4 p-4 z-40 bg-white dark:bg-gray-950">
        {categoryData.map((cat, index) => (
          <div
            onClick={() => onCategoryClick(cat.category)}
            key={index}
            className={`flex-shrink-0 flex relative group cursor-pointer transition-all duration-300 hover:scale-105
              ${cat.category === selectedCategory ? 'scale-110' : ''}`}
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