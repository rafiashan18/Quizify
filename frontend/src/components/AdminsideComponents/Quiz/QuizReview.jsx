

const QuizReview = ({ quizDetails, questions }) => {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold bg-gradient-to-r  from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
            Review Quiz
          </h2>
          <span className="inline-flex items-center text-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-200">
            Final Review
          </span>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-2 border border-gray-200 dark:border-gray-700">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Quiz Summary</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium mr-2">Title:</span>
              <span>{quizDetails.title}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium mr-2">Category:</span>
              <span>{quizDetails.category}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="font-medium mr-2">Questions:</span>
              <span>{questions.length}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default QuizReview