import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedQuestion, addNewQuestion } from '../../../../redux/Slices/QuizSlice'; // Adjust path as needed
import QuestionItem from './QuestionItem';
import { PlusCircle } from 'lucide-react'; // Import the plus icon

const QuizQuestions = ({ 
  onDeleteQuestion,
  handleQuestionChange, 
  handleOptionChange, 
  handleCorrectOptionChange,
  handleQuestionFileChange
}) => {
  const dispatch = useDispatch();
  const { quiz, editMode, editedQuiz, expandedQuestion } = useSelector(state => state.quiz);

  const toggleQuestionExpand = (index) => {
    if (expandedQuestion === index) {
      dispatch(setExpandedQuestion(null));
    } else {
      dispatch(setExpandedQuestion(index));
    }
  };
  
  const handleAddQuestion = () => {
      const newQuestion = {
      questionText: "New question",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctOption: 0,
      explanation: "",
      imageUrl: null
    };
    
    dispatch(addNewQuestion(newQuestion));
    
  
    setTimeout(() => {
      const newIndex = (quiz.questions?.length || 0);
      dispatch(setExpandedQuestion(newIndex));
    }, 0);
  };

  if (!quiz) return null;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-purple-800">
          Questions ({quiz.questions?.length || 0})
        </h2>
        
        {editMode && (
          <button
            onClick={handleAddQuestion}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-150"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Question
          </button>
        )}
      </div>
      
      {quiz.questions && quiz.questions.length > 0 ? (
        <div className="space-y-6">
          {quiz.questions.map((question, qIndex) => (
            <QuestionItem 
              key={question._id || qIndex}
              question={question}
              qIndex={qIndex}
              editMode={editMode}
              editedQuiz={editedQuiz}
              expandedQuestion={expandedQuestion}
              toggleQuestionExpand={toggleQuestionExpand}
              handleQuestionChange={handleQuestionChange}
              handleOptionChange={handleOptionChange}
              handleCorrectOptionChange={handleCorrectOptionChange}
              onDeleteQuestion={onDeleteQuestion}
              quizId={quiz._id}
              handleQuestionFileChange={handleQuestionFileChange}
            />
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          <p>This quiz doesn't have any questions yet. {editMode && "Click the 'Add Question' button to create one."}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;