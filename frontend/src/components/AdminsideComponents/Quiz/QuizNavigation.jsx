export const QuizNavigation = ({ 
  currentStep, 
  currentQuestionIndex, 
  questionsLength, 
  onBack, 
  onNext 
}) => {

  const getButtonText = () => {
    if (currentStep === 1 && currentQuestionIndex < questionsLength - 1) {
      return 'Next Question';
    }
    if(currentStep === 2 )
      return 'Submit'

    return 'Next';
  };

  return (
    <div className="md:mt-4 flex items-center justify-between pt-4">
      <button
        onClick={onBack}
        disabled={currentStep === 0}
        className="px-6 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-700 dark:hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 dark:focus:ring-gray-700"
      >
        Back
      </button>
      <button
        onClick={onNext}
        className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-600"
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default QuizNavigation;