
const QuizDetails = ({ quizDetails, handleQuizDetailsChange }) => {
    return (
      <div className=" md:max-w-2xl w-full  md:mx-auto md:p-8 p-2 border-red-700 bg-white dark:bg-gray-800 rounded-xl md:shadow-lg">
        <div className="mb-8">
          <h2 className="md:text-2xl text-lg font-bold text-gray-800 dark:text-white">Quiz Configuration</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Fill in the basic details for your quiz</p>
        </div>
  
        <div className="md:space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Quiz Title
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={quizDetails.title}
              onChange={handleQuizDetailsChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter a descriptive title for your quiz"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Choose a clear, engaging title that reflects the quiz content
            </p>
          </div>
  
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Category
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              name="category"
              value={quizDetails.category}
              onChange={handleQuizDetailsChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="e.g., Mathematics, Science, History"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Categorize your quiz to help users find it easily
            </p>
          </div>
  
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Number of Questions
              <span className="ml-1 text-red-500">*</span>
            </label>
            <input
              type="number"
              name="numberOfQuestions"
              value={quizDetails.numberOfQuestions}
              onChange={handleQuizDetailsChange}
              min="1"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter the total number of questions"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Recommended: 5-10 questions for optimal engagement
            </p>
          </div>
        </div>
  
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </div>
    );
  };


  export default QuizDetails;