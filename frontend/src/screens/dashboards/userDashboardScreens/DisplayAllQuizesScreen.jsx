import React, { useState, useEffect } from 'react';
import Carousel from '../../../components/Common/Carousel';
import CategorySlider from '../../../components/Common/CategorySlider';
import { getAllQuizzes } from '../../../services/QuizApi';
import { 
  allCategoriesByLimited, 
  LimitedQuizBYCategoryAndType, 
  AllQuizzesByCategoryAndType 
} from '../../../services/QuizRetrievalApi';
import { useNavigate } from 'react-router-dom';

const DisplayAllQuizesScreen = () => {
  const navigate=useNavigate()
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allCategoriesQuizzes, setAllCategoriesQuizzes] = useState({});
  const [categoryQuizzes, setCategoryQuizzes] = useState({
    easy: [],
    medium: [],
    hard: [],
    popular: [],
    recent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
      try {
        setLoading(true);
        const response = await allCategoriesByLimited();
        
        const categoriesData = response && response.quizesByCategories 
          ? response.quizesByCategories 
          : response; 
        
        if (categoriesData && typeof categoriesData === 'object') {
          const validatedData = Object.fromEntries(
            Object.entries(categoriesData).map(([category, quizzes]) => {
              return [category, Array.isArray(quizzes) ? quizzes : []];
            })
          );
          setAllCategoriesQuizzes(validatedData);
          console.log("Processed categories data:", validatedData);
        } else {
          console.error("Invalid data format received:", categoriesData);
          setAllCategoriesQuizzes({});
        }
      } catch (error) {
        console.error("Error fetching all categories data:", error);
        setAllCategoriesQuizzes({});
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategoriesData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      if (selectedCategory && selectedCategory !== "all") {
        try {
          setLoading(true);
          const response = await LimitedQuizBYCategoryAndType(selectedCategory);
          console.log(response)
          const categoryData = response && response.quizzesByType 
            ? response.quizzesByType 
            : response; // Fallback to direct response
          
          if (categoryData && typeof categoryData === 'object') {
            const validatedData = {
              easy: Array.isArray(categoryData.easy) ? categoryData.easy : [],
              medium: Array.isArray(categoryData.medium) ? categoryData.medium : [],
              hard: Array.isArray(categoryData.hard) ? categoryData.hard : [],
              popular: Array.isArray(categoryData.popular) ? categoryData.popular : [],
              recent: Array.isArray(categoryData.recent) ? categoryData.recent : []
            };
            setCategoryQuizzes(validatedData);
            console.log("Processed category data:", validatedData);
          } else {
            console.error("Invalid category data format:", categoryData);
            setCategoryQuizzes({
              easy: [],
              medium: [],
              hard: [],
              popular: [],
              recent: []
            });
          }
        } catch (error) {
          console.error(`Error fetching data for category ${selectedCategory}:`, error);
          setCategoryQuizzes({
            easy: [],
            medium: [],
            hard: [],
            popular: [],
            recent: []
          });
        } finally {
          setLoading(false);
        }
      }
    };

    if (selectedCategory !== "all") {
      fetchCategoryData();
    }
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    console.log(category)
    setSelectedCategory(category);
  };

  const handleViewAll = async (category, type) => {
    try {
    
      navigate(`/user/view-category-quizes/${category}/${type}`)
    } catch (error) {
      console.error(`Error fetching all quizzes for ${category} - ${type}:`, error);
    }
  };

  const renderCarouselSection = (title, quizzes, category, type) => {

    const safeQuizzes = Array.isArray(quizzes) ? quizzes : [];
    
    if (safeQuizzes.length > 0) {
      return (
        <div className="mb-8">
          <Carousel 
            title={title} 
            quizzes={safeQuizzes} 
            onViewAll={() => handleViewAll(category, type)}
          />
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const hasAnyQuizzes = Object.values(allCategoriesQuizzes).some(quizzes => 
    Array.isArray(quizzes) && quizzes.length > 0
  );

  return (
    <div className="relative">
      <div className=" z-40 bg-white shadow-sm sticky top-0">
        <CategorySlider 
          onCategoryClick={handleCategoryClick} 
          selectedCategory={selectedCategory} 
        />
      </div>

      <div className="p-4">
        {selectedCategory === "all" ? (
          <>
            {Object.entries(allCategoriesQuizzes).map(([category, quizzes]) => {

              const safeQuizzes = Array.isArray(quizzes) ? quizzes : [];
              
              return safeQuizzes.length > 0 ? (
                <div key={category} className="mb-8">
                  <Carousel 
                    title={`${category} Quizzes`} 
                    quizzes={safeQuizzes} 
                    onViewAll={() => handleViewAll(category, 'all')}
                  />
                </div>
              ) : null;
            })}
            
            {/* No quizzes message */}
            {!hasAnyQuizzes && (
              <div className="text-center py-8 text-gray-500">
                No quizzes available yet. Check back soon!
              </div>
            )}
          </>
        ) : (
          <>
            {renderCarouselSection(
              `Popular ${selectedCategory} Quizzes`,
              categoryQuizzes.popular,
              selectedCategory,
              'popular'
            )}
            {renderCarouselSection(
              `Hard ${selectedCategory} Quizzes`,
              categoryQuizzes.hard,
              selectedCategory,
              'hard'
            )}
            {renderCarouselSection(
              `Medium ${selectedCategory} Quizzes`,
              categoryQuizzes.medium,
              selectedCategory,
              'medium'
            )}
            {renderCarouselSection(
              `Easy ${selectedCategory} Quizzes`,
              categoryQuizzes.easy,
              selectedCategory,
              'easy'
            )}
            {renderCarouselSection(
              `Most Recent ${selectedCategory} Quizzes`,
              categoryQuizzes.recent,
              selectedCategory,
              'recent'
            )}
            
            {/* No quizzes for selected category message */}
            {selectedCategory !== "all" && Object.values(categoryQuizzes).every(arr => arr.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                No quizzes available for {selectedCategory} category yet.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayAllQuizesScreen;