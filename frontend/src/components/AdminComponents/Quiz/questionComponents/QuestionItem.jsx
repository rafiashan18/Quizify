import React, { useState } from 'react';
import { AlertTriangle, Trash2, Loader } from 'lucide-react';
import QuestionEditForm from './QuestionEditForm';
import QuestionDisplay from './QuestionDisplay';

const QuestionItem = ({
  question,
  qIndex,
  editMode,
  editedQuiz,
  expandedQuestion,
  toggleQuestionExpand,
  handleQuestionChange,
  handleOptionChange,
  handleCorrectOptionChange,
  onDeleteQuestion,
  quizId
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent expanding/collapsing when clicking delete
    setShowDeleteConfirm(true);
    setError(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      
      const questionId = question._id;
      
      if (!questionId || !quizId) {
        console.error('Question ID or Quiz ID not found');
        setError('Missing required IDs for deletion');
        setIsDeleting(false);
        return;
      }
  
      // Call the parent's deletion handler
      await onDeleteQuestion(qIndex, questionId);
      setShowDeleteConfirm(false);
      
    } catch (err) {
      console.error('Error deleting question:', err);
      setError('An error occurred while deleting the question');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation(); // Prevent expanding/collapsing when clicking cancel
    setShowDeleteConfirm(false);
    setError(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div 
        className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center"
        onClick={() => toggleQuestionExpand(qIndex)}
      >
        <h3 className="font-medium">
          Question {qIndex + 1}
          {question.questionText && `: ${question.questionText.substring(0, 50)}`}
          {question.questionText && question.questionText.length > 50 && '...'}
        </h3>
        <div className="flex items-center">
          {editMode && !showDeleteConfirm && (
            <button 
              onClick={handleDeleteClick}
              className="mr-3 text-red-500 hover:text-red-700 focus:outline-none"
              title="Delete question"
            >
              <Trash2 size={18} />
            </button>
          )}
          <svg 
            className={`w-5 h-5 transform transition-transform ${expandedQuestion === qIndex ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      
      {showDeleteConfirm && (
        <div className="p-4 border-t border-gray-100 bg-red-50">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <span className="font-medium text-red-700">Confirm deletion of Question {qIndex + 1}</span>
          </div>
          <p className="text-sm text-red-600 mt-1 mb-3">
            This action cannot be undone.
          </p>
          
          {error && (
            <div className="mb-3 p-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancelDelete}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded text-sm hover:bg-gray-300"
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 flex items-center"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader size={14} className="animate-spin mr-1" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      )}
      
      {expandedQuestion === qIndex && !showDeleteConfirm && (
        <div className="p-6 border-t border-gray-100">
          {editMode ? (
            <QuestionEditForm 
              qIndex={qIndex}
              editedQuiz={editedQuiz}
              handleQuestionChange={handleQuestionChange}
              handleOptionChange={handleOptionChange}
              handleCorrectOptionChange={handleCorrectOptionChange}
            />
          ) : (
            <QuestionDisplay question={question} />
          )}
        </div>
      )}
    </div>
  );
};

export default QuestionItem;