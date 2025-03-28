import React, { useState } from 'react';
import QuizDeleteModal from '../../../modals/QuizDeleteModal';
import { useNavigate } from 'react-router-dom';

const QuizHeader = ({ quiz, editMode, handleEditToggle, handleSaveChanges, savingChanges, onBack }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate()
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-purple-800">
            {editMode ? 'Edit Quiz' : 'Quiz Details'}
          </h1>
          <p className="text-gray-600 mt-1">
            ID: <span className="font-mono text-xs">{quiz._id}</span>
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button 
            onClick={handleEditToggle}
            className={`px-4 py-2 rounded-md ${editMode 
              ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
          >
            {editMode ? 'Cancel' : 'Edit Quiz'}
          </button>
          {editMode && (
            <button 
              onClick={handleSaveChanges}
              disabled={savingChanges}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
            >
              {savingChanges ? 'Saving...' : 'Save Changes'}
            </button>
          )}
          <button 
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete Quiz
          </button>
          
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
          >
            Back
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <QuizDeleteModal 
          quiz={quiz}
          onClose={() => navigate(-1)} 
        
        />
      )}
    </>
  );
};

export default QuizHeader;