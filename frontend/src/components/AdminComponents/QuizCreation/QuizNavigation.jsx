import React from 'react';

const QuizNavigation = ({ 
  currentStep, 
  currentQuestionIndex, 
  questionsLength, 
  onBack, 
  onNext,
  quizDetails,
  questions,
  isSubmitting
}) => {

  // Function to validate quiz details including cover image
  const validateQuizDetails = () => {
    return (
      quizDetails.title && 
      quizDetails.title.trim() !== '' && 
      quizDetails.description && 
      quizDetails.description.trim() !== '' && 
      quizDetails.category && 
      quizDetails.difficulty &&
      quizDetails.coverImage !== null  // Cover image is now required
    );
  };

  // Function to check if a question is valid
  const isQuestionValid = (question) => {
    return (
      question.questionText.trim() !== '' &&
      question.options.every(option => option.trim() !== '') &&
      question.correctOption !== ''
    );
  };

  // Check if all questions are valid
  const areQuestionsValid = () => {
    return questions.length > 0 && questions.every(isQuestionValid);
  };

  const isNextDisabled = () => {
    // First check if submission is in progress
    if (isSubmitting) {
      return true;
    }
    
    if (currentStep === 0) {
      return !validateQuizDetails();
    }
    if (currentStep === 1) {
      return !areQuestionsValid();
    }
    return false; 
  };

  const getButtonText = () => {
    if (isSubmitting) {
      return currentStep === 2 ? 'Submitting Quiz...' : 'Processing...';
    }
    
    if (currentStep === 1 && currentQuestionIndex < questionsLength - 1) {
      return 'Next Question';
    }
    if (currentStep === 2) {
      return 'Submit Quiz';
    }
    return 'Next';
  };

  // Handle next button click with validation
  const handleNextClick = () => {
    if (!isNextDisabled()) {
      onNext();
    }
  };

  return (
    <div className="md:mt-4 flex items-center justify-between pt-4">
      <button
        onClick={onBack}
        disabled={currentStep === 0 || isSubmitting}
        className="px-6 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700"
      >
        Back
      </button>
      <button
        onClick={handleNextClick}
        disabled={isNextDisabled()}
        className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-600 flex items-center"
      >
        {isSubmitting && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {getButtonText()}
      </button>
    </div>
  );
};

export default QuizNavigation;