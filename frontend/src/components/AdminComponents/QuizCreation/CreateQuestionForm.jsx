import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { PlusCircle, Trash2, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CreateQuestionForm = ({ onNext, questions, setQuestions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

 
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value,
    };
    setQuestions(newQuestions);
  };

  // Update option text
  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    const newOptions = [...newQuestions[questionIndex].options];
    newOptions[optionIndex] = value;
    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      options: newOptions,
    };
    setQuestions(newQuestions);
  };

  // Handle image upload - now stores the file object directly
  const handleImageUpload = (questionIndex, event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a preview URL for display purposes
      
      const newQuestions = [...questions];
      newQuestions[questionIndex] = {
        ...newQuestions[questionIndex],
        imageFile: file, // Store the actual file object
        // imagePreviewUrl: previewUrl, // Store the preview URL for display
      };
      console.log(newQuestions)
      setQuestions(newQuestions);
    }
  };

  // Add a new question
  const addQuestion = () => {
    const newQuestion = {
      questionText: '',
      imagePreviewUrl: null,
      options: ['', '', '', ''],
      correctOption: '',
    };
    console.log(questions);
    setQuestions([...questions, newQuestion]);
    console.log(questions);
    setCurrentQuestionIndex(questions.length); // Move to the new question
  };

  // Remove a question
  const removeQuestion = (index) => {
    if (questions.length > 1) {
      // Revoke any object URLs to prevent memory leaks
      if (questions[index].imagePreviewUrl) {
        URL.revokeObjectURL(questions[index].imagePreviewUrl);
      }
      
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      setCurrentQuestionIndex(Math.min(currentQuestionIndex, newQuestions.length - 1));
    }
  };

  // Navigate between questions
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Initialize with one question if questions array is empty
  React.useEffect(() => {
    if (questions.length === 0) {
      const initialQuestion = {
        questionText: '',
        questionId: uuidv4(),
        imageFile: null,
        imagePreviewUrl: null,
        options: ['', '', '', ''],
        correctOption: '',
      };
      setQuestions([initialQuestion]);
    }
    
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      questions.forEach(question => {
        if (question.imagePreviewUrl) {
          URL.revokeObjectURL(question.imagePreviewUrl);
        }
      });
    };
  }, []);

  // Validation
  const isQuestionValid = (question) => {
    return (
      question.questionText.trim() !== '' &&
      question.options.every(option => option.trim() !== '') &&
      question.correctOption !== ''
    );
  };
  
  // Add this computed value
  const hasValidQuestion = questions.some(isQuestionValid);
  
  // Handle form submit
  const onSubmit = (data) => {
    if (hasValidQuestion && onNext) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-purple-600">Add Questions</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <button
            type="button"
            onClick={addQuestion}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <PlusCircle size={20} />
            Add Question
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            type="button"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`p-2 rounded-full ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-purple-600 hover:bg-purple-100'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            type="button"
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`p-2 rounded-full ${
              currentQuestionIndex === questions.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-purple-600 hover:bg-purple-100'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Question Cards */}
        <div className="mx-12">
          {questions.map((question, questionIndex) => (
            <div
              key={question.questionId}
              className={`bg-white p-6 rounded-lg shadow-md space-y-4 transition-opacity duration-300 ${
                questionIndex === currentQuestionIndex ? 'block' : 'hidden'
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">Question {questionIndex + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(questionIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Question Text</label>
                  <input
                    type="text"
                    value={question.questionText}
                    onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                    className="w-full p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter your question"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Question Image (Optional)
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(questionIndex, e)}
                        className="hidden"
                        id={`image-upload-${questionIndex}`}
                      />
                      <label
                        htmlFor={`image-upload-${questionIndex}`}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded cursor-pointer hover:bg-gray-200"
                      >
                        <ImageIcon size={20} />
                        {question.imageFile ? 'Change Image' : 'Upload Image'}
                      </label>
                      {question.imageFile && (
                        <div className="flex items-center gap-2">
                          <img
                            src={question.imagePreviewUrl}
                            alt="Question"
                            className="h-12 w-12 object-cover rounded"
                          />
                          <span className="text-sm text-gray-500">
                            {question.imageFile.name} ({Math.round(question.imageFile.size / 1024)} KB)
                          </span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="space-y-3">
                  <label className="block text-gray-700">Options</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${question.questionId}`}
                        checked={question.correctOption === optionIndex.toString()}
                        onChange={() => handleQuestionChange(questionIndex, 'correctOption', optionIndex.toString())}
                        className="text-purple-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                        className="flex-1 p-2 border rounded focus:ring-purple-500 focus:border-purple-500"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {questions.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-purple-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </form>
  );
};

export default CreateQuestionForm;