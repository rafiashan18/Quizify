import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedQuestion } from '../../../../redux/Slices/QuizSlice'; // Adjust path as needed
import QuestionItem from './QuestionItem';

const QuizQuestions = ({ 
  onDeleteQuestion,
  handleQuestionChange, 
  handleOptionChange, 
  handleCorrectOptionChange
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

  if (!quiz) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-purple-800 mb-4">
        Questions ({quiz.questions?.length || 0})
      </h2>
      
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
            />
          ))}
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg">
          <p>This quiz doesn't have any questions yet.</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;