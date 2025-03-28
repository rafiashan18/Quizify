import React from 'react';
import { useSelector } from 'react-redux';
import EditQuizForm from './EditQuizForm';

const QuizInformation = ({ editMode, handleInputChange, handleFileChange }) => {
  const { quiz, editedQuiz } = useSelector(state => state.quiz);

  if (!quiz) return null;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">Quiz Information</h2>
        
        {editMode ? (
          <EditQuizForm 
            editedQuiz={editedQuiz} 
            handleInputChange={handleInputChange} 
            handleFileChange={handleFileChange}
          />
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1">{quiz.title}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{quiz.category}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
                <p className="mt-1 capitalize">{quiz.difficulty}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Attempts</h3>
                <p className="mt-1">{quiz.attempts}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1">{quiz.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Premium</h3>
              <p className="mt-1">
                {quiz.isPremium !== undefined ? (quiz.isPremium ? "Yes" : "No") : "Not specified"}
              </p>
            </div>
            
            {quiz.coverImage && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Cover Image</h3>
                <div className="mt-2">
                  <img 
                    src={quiz.coverImage} 
                    alt={quiz.title} 
                    className="max-h-64 rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/640x360?text=Image+Not+Found';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizInformation;