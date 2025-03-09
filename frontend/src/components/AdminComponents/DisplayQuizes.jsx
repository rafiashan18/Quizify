import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySlider from '../userComponents/CategorySlider';
import { getAllQuizzes } from '../../services/QuizApi';

const DisplayQuizes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await getAllQuizzes(); 
    
        console.log(data);
        
        if (data.success && data.quizzes) {
          setQuizzes(data.quizzes); 
        } else {
          console.error("Failed to fetch quizzes:", data.message);
        }
        console.log(quizzes)
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchQuizzes();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="z-40 bg-white shadow-sm">
        <CategorySlider 
          onCategoryClick={handleCategoryClick} 
          selectedCategory={selectedCategory} 
        />
      </div>

      <div className="p-4">
        <h2 className="text-2xl text-purple-700 font-bold mb-6">
          {selectedCategory ? `${selectedCategory} Quizzes` : 'All Quizzes'}
        </h2>

        {getFilteredQuizzes().length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {getFilteredQuizzes().map(quiz => (

              <div 
                key={quiz._id} 
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => navigate(`/admin/edit-quiz/${quiz._id}`)}
                // onClick={()=>console.log(quiz)}

              >
                {/* Quiz Image */}
                <div className="h-40 overflow-hidden">
                  <img 
                    src={quiz.coverImage || 'https://via.placeholder.com/300x180?text=Quiz+Image'} 
                    alt={quiz.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Quiz Content */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {quiz.category || 'General'}
                    </span>
                    <span className="text-xs">
                      {quiz.questions?.length || 0} questions
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{quiz.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-lg text-gray-600">
              No quizzes found{selectedCategory ? ` for ${selectedCategory} category` : ''}.
            </p>
            <button 
              onClick={() => navigate('/admin/create-quiz')}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Create New Quiz
            </button>
          </div>
        )}
      </div>

      {/* Add Quiz Button */}
      <div className="fixed bottom-6 right-6">
        <button 
          onClick={() => navigate('/admin/create-quiz')}
          className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DisplayQuizes;