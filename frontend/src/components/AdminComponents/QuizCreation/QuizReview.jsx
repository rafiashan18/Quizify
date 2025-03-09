import React, { useState } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuizReview = ({ quizDetails,questions }) => {
 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-600">Review Quiz</h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
          Final Review
        </span>
      </div>

      <div className="bg-white rounded-lg  p-6 space-y-6 dark:bg-gray-800">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Quiz Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600 dark:text-gray-400 font-medium">Title</label>
              <p className="text-gray-800 dark:text-gray-200">{quizDetails?.title || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-gray-600 dark:text-gray-400 font-medium">Category</label>
              <p className="text-gray-800 dark:text-gray-200">{quizDetails?.category || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-gray-600 dark:text-gray-400 font-medium">Difficulty</label>
              <p className="text-gray-800 dark:text-gray-200 capitalize">{quizDetails?.difficulty || 'N/A'}</p>
            </div>
            
            <div>
              <label className="text-gray-600 dark:text-gray-400 font-medium">Total Questions</label>
              <p className="text-gray-800 dark:text-gray-200">{questions?.length || 0}</p>
            </div>
          </div>
          
          <div>
            <label className="text-gray-600 dark:text-gray-400 font-medium">Description</label>
            <p className="text-gray-800 dark:text-gray-200">{quizDetails?.description || 'No description provided'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Questions Preview</h3>
            <span className="text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {questions?.length || 0}
            </span>
          </div>
          
          <div className="relative">
            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center -ml-4">
              <button
                type="button"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className={`p-2 rounded-full ${
                  currentQuestionIndex === 0 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900'
                }`}
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center -mr-4">
              <button
                type="button"
                onClick={nextQuestion}
                disabled={currentQuestionIndex === (questions?.length || 0) - 1}
                className={`p-2 rounded-full ${
                  currentQuestionIndex === (questions?.length || 0) - 1
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 hover:bg-purple-100 dark:hover:bg-purple-900'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Question Cards */}
            <div className="mx-8">
              {questions?.map((question, index) => (
                <div
                  key={question.questionId}
                  className={`border rounded-lg p-4 dark:border-gray-700 transition-opacity duration-300 ${
                    index === currentQuestionIndex ? 'block' : 'hidden'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Question {index + 1}</h4>
                    {question.imageUrl && (
                      <span className="text-purple-600 dark:text-purple-400 text-sm">Contains image</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">{question.questionText}</p>
                  {question.imageUrl && (
                    <img 
                      src={question.imageUrl} 
                      alt="Question" 
                      className="mb-2 max-h-48 object-contain rounded"
                    />
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          question.correctOption === optIndex.toString()
                            ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300'
                            : 'bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Question Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {questions?.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentQuestionIndex 
                      ? 'bg-purple-600' 
                      : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;