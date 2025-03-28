import React, { useState } from "react";

const difficulties = ["easy", "medium", "hard"];
const categories = [ "Science", "History", "Sports", "Art",'Geography','Trivia'];

const CreateQuizDetails = ({ quizDetails, setQuizDetails }) => {
  const [previewImage, setPreviewImage] = useState(quizDetails?.coverImage || null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setQuizDetails(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);

      setQuizDetails(prev => ({
        ...prev,
        coverImage: file
      }));

      if (errors.coverImage) {
        setErrors({
          ...errors,
          coverImage: null
        });
      }
    }
  };

  return (
    <div className="mx-auto p-6 max-w-4xl bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-purple-600 mb-6">Create Quiz</h2>

      <div className="space-y-4">
        {/* Quiz Title */}
        <div>
          <label className="block text-purple-700 mb-2">
            Quiz Title <span className="text-red-500">*</span>
          </label>
          <input 
            name="title"
            value={quizDetails.title}
            onChange={handleChange}
            type="text"
            placeholder="Enter quiz title"
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Quiz Description */}
        <div>
          <label className="block text-purple-700 mb-2">
            Quiz Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            name="description"
            value={quizDetails.description}
            onChange={handleChange}
            placeholder="Describe your quiz"
            rows={4}
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* Quiz Category */}
        <div>
          <label className="block text-purple-700 mb-2">
            Quiz Category <span className="text-red-500">*</span>
          </label>
          <select 
            name="category"
            value={quizDetails.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Quiz Difficulty */}
        <div>
          <label className="block text-purple-700 mb-2">
            Difficulty Level <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-4">
            {difficulties.map(diff => (
              <label key={diff} className="flex items-center space-x-2">
                <input 
                  name="difficulty"
                  type="radio"
                  value={diff}
                  checked={quizDetails.difficulty === diff}
                  onChange={handleChange}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
              </label>
            ))}
          </div>
          {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 text-purple-700">
            <input 
              name="isPremium"
              type="checkbox"
              checked={quizDetails.isPremium}
              onChange={handleChange}
              className="text-purple-600 focus:ring-purple-500"
            />
            <span>Premium Quiz (Requires Payment)</span>
          </label>
          <p className="text-sm text-gray-500 mt-1">Enable this option if this quiz should be available only to paid users</p>
        </div> 

        {quizDetails.isPremium && (
          <div>
            <label className="block text-purple-700 mb-2">
              Quiz Price <span className="text-red-500">*</span>
            </label>
            <input 
              name="amount"
              value={quizDetails.amount || ""}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter price amount"
              className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
            <p className="text-sm text-gray-500 mt-1">Enter the amount users will need to pay to access this quiz</p>
          </div>
        )}

        {/* Cover Image Upload - now required */}
        <div>
          <label className="block text-purple-700 mb-2">
            Quiz Cover Image <span className="text-red-500">*</span>
          </label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
          {previewImage && (
            <img src={previewImage} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />
          )}
          {!previewImage && (
            <p className="text-sm text-gray-500 mt-1">Please upload a cover image for your quiz</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateQuizDetails;