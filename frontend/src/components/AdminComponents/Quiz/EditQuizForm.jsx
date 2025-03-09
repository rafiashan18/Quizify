import React from 'react';
import ImageUploadField from '../../commonComponents/ImageUploadField';

const EditQuizForm = ({ editedQuiz, handleInputChange, handleFileChange }) => {
  const difficultyOptions = ['easy', 'medium', 'hard'];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={editedQuiz.title}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <input
          type="text"
          name="category"
          value={editedQuiz.category}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <select
          name="difficulty"
          value={editedQuiz.difficulty}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {difficultyOptions.map(option => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={editedQuiz.description}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>
      </div>
      
      {/* Replace the coverImage text input with ImageUploadField */}
      <ImageUploadField 
        label="Cover Image" 
        currentImageUrl={editedQuiz.coverImage} 
        onFileChange={handleFileChange}
        fieldName="coverImage"
      />
    </div>
  );
};

export default EditQuizForm;