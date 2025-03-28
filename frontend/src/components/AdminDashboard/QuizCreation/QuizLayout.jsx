const QuizLayout = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br border  from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
      <div className="bg-white dark:bg-gray-900 rounded-2xl  border border-gray-100 dark:border-gray-800 backdrop-blur-sm">
        <div className="p-2 flex flex-col justify-items-start align-top">
          {children}
        </div>
      </div>
    </div>
  );

  export default QuizLayout