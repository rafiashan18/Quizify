import React from 'react';
import ImageUploadField from '../../../commonComponents/ImageUploadField';

const QuestionEditForm = ({
  qIndex,
  editedQuiz,
  handleQuestionChange,
  handleOptionChange,
  handleCorrectOptionChange,
  handleQuestionFileChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
        <input
          type="text"
          value={editedQuiz.questions[qIndex].questionText || ''}
          onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      {/* Replace the imageUrl text input with ImageUploadField */}
      <ImageUploadField 
        label="Question Image" 
        currentImageUrl={editedQuiz.questions[qIndex].imageUrl || ''} 
        onFileChange={(fieldName, file) => handleQuestionFileChange(qIndex, file)}
        fieldName={`ImageUrl-${qIndex}`}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
        <p className="text-sm text-gray-500 mb-2">Add at least 2 options and select the correct answer.</p>
        
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, oIndex) => (
            <div key={oIndex} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`correct-option-${qIndex}`}
                checked={editedQuiz.questions[qIndex].correctOption === oIndex.toString()}
                onChange={() => handleCorrectOptionChange(qIndex, oIndex.toString())}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
              />
              <input
                type="text"
                value={(editedQuiz.questions[qIndex].options && editedQuiz.questions[qIndex].options[oIndex]) || ''}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditForm;