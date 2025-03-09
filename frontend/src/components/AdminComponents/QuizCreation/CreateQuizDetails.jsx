import React, { useEffect, useState } from "react";

const difficulties = ["easy", "medium", "hard"];
const categories = ["Technology", "Science", "History", "Sports", "Art"];

const CreateQuizDetails = ({ quizDetails, setQuizDetails }) => {
  const [previewImage, setPreviewImage] = useState(quizDetails?.coverImage || null);
  const [formData, setFormData] = useState({
    title: quizDetails?.title || "",
    description: quizDetails?.description || "",
    category: quizDetails?.category || "",
    difficulty: quizDetails?.difficulty || "",
    coverImage: quizDetails?.coverImage || null
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Update parent state in real-time
    setQuizDetails(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);

      // Update local and parent state with the file
      setFormData({
        ...formData,
        coverImage: file
      });

      setQuizDetails(prev => ({
        ...prev,
        coverImage: file
      }));

      // Clear any error for the cover image
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
            value={formData.title}
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
            value={formData.description}
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
            value={formData.category}
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
                  checked={formData.difficulty === diff}
                  onChange={handleChange}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span>{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
              </label>
            ))}
          </div>
          {errors.difficulty && <p className="text-red-500 text-sm">{errors.difficulty}</p>}
        </div>

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