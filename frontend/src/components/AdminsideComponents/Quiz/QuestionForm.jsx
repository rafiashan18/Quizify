const QuestionForm = ({ currentQuestion, currentQuestionIndex, questionsLength, handleQuestionChange, onDeleteQuestion }) => {
  // console.log("The ciurrent question")
  // console.log(currentQuestion)
  return (
    <div className="max-w-4xl mx-auto md:p-6 p-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg md:space-y-4 space-y-2">
    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Question {currentQuestionIndex + 1} of {questionsLength}
        </h3>
        {/* Only show delete button if there's more than one question */}
        {questionsLength > 1 && (
          <button
            onClick={() => onDeleteQuestion(currentQuestionIndex)}
            className="px-4 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium focus:outline-none"
          >
            Delete Question
          </button>
        )}
      </div>

      <div className="md:space-y-6 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Question Text
          </label>
          <input
            type="text"
            value={currentQuestion.question}
            onChange={(e) => handleQuestionChange('question', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
            placeholder="Enter your question"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Option 1
            </label>
            <input
              type="text"
              value={currentQuestion.options[0]}
              onChange={(e) => handleQuestionChange('options', e.target.value, 0)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter option 1"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Option 2
            </label>
            <input
              type="text"
              value={currentQuestion.options[1]}
              onChange={(e) => handleQuestionChange('options', e.target.value, 1)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter option 2"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Option 3
            </label>
            <input
              type="text"
              value={currentQuestion.options[2]}
              onChange={(e) => handleQuestionChange('options', e.target.value, 2)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter option 3"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
              Option 4
            </label>
            <input
              type="text"
              value={currentQuestion.options[3]}
              onChange={(e) => handleQuestionChange('options', e.target.value, 3)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 placeholder-gray-400 text-gray-800 dark:text-white dark:bg-gray-700 dark:placeholder-gray-400"
              placeholder="Enter option 4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
            Correct Answer
          </label>
          <input
            type="text"
            value={currentQuestion.correctAnswer}
            onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-800 dark:text-white dark:bg-gray-700"
            placeholder="Enter the correct answer"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;