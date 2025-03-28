import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, updateQuiz, deleteQuizQuestion } from '../../../services/QuizApi';
import QuizHeader from '../../../components/AdminDashboard/Quiz/QuizHeader';
import QuizInformation from '../../../components/AdminDashboard/Quiz/QuizInformation';
// import QuizQuestions from '../../../components/AdminDashboard/Quiz/QuestionComponents/QuizQuestions';
import QuizQuestions from '../../../components/AdminDashboard/Quiz/QuestionComponents/QuizQuestion';
import LoadingSpinner from '../../../components/Common/LoadingSpinner';
import ErrorMessage from '../../../components/Common/ErrorMessage';
import FloatingActionButtons from '../../../components/AdminDashboard/Quiz/FloatingActionButtons';
import {
  setQuiz,
  setLoading,
  setError,
  toggleEditMode,
  setSavingChanges,
  updateQuizField,
  updateQuestionField,
  updateQuestionOption,
  updateCorrectOption,
  removeQuestion,
  resetEditedQuiz,
  addNewQuestion,
  setExpandedQuestion // Added this import
} from '../../../redux/Slices/QuizSlice.jsx';
import { useDispatch, useSelector } from 'react-redux';

const QuizDetailsScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get state from Redux store
  const {
    quiz,
    editedQuiz,
    loading,
    error,
    editMode,
    savingChanges
  } = useSelector(state => state.quiz);
  const [files, setFiles] = useState({
    coverImage: null,
    questionImages: []
  });
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        dispatch(setLoading(true));
        dispatch(resetEditedQuiz())
        const response = await getQuizById(id);
        
        if (response.success && response.quiz) {
          dispatch(setQuiz(response.quiz));
        } else {
          dispatch(setError(response.message || 'Failed to fetch quiz details'));
        }
      } catch (err) {
        dispatch(setError('An error occurred while fetching quiz details'));
        console.error(err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (id) {
      fetchQuizDetails();
    }
  }, [id, dispatch]);

  const handleEditToggle = () => {
    dispatch(toggleEditMode());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateQuizField({ name, value }));
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    dispatch(updateQuestionField({ questionIndex, field, value }));
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    dispatch(updateQuestionOption({ questionIndex, optionIndex, value }));
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    dispatch(updateCorrectOption({ questionIndex, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editedQuiz) return;
    
    try {
      dispatch(setSavingChanges(true));
      
      // Create FormData
      const formData = new FormData();
      console.log(editedQuiz)
      formData.append('title', editedQuiz.title);
      formData.append('description', editedQuiz.description);
      formData.append('category', editedQuiz.category);
      formData.append('difficulty', editedQuiz.difficulty);
      formData.append('isPremium', String(editedQuiz.isPremium));
      
      if (files.coverImage) {
        formData.append('coverImage', files.coverImage);
      }
      
      formData.append('questions', JSON.stringify(editedQuiz.questions));
      
      files.questionImages.forEach((file, index) => {
        if (file) {
          formData.append('ImageUrl', file);
        }
      });
      
      const response = await updateQuiz(id, formData, true); 
      if (response.success) {
        dispatch(setQuiz(response.quiz || editedQuiz));
        dispatch(toggleEditMode());
      } else {
        dispatch(setError(response.message || 'Failed to update quiz'));
      }
    } catch (err) {
      dispatch(setError('An error occurred while updating the quiz'));
      console.error(err);
    } finally {
      dispatch(setSavingChanges(false));
    }
  };

  const handleSaveChanges = async () => {
    try {
      dispatch(setSavingChanges(true));
      const response = await updateQuiz(id, editedQuiz);
      
      if (response.success) {
        dispatch(setQuiz(editedQuiz));
        dispatch(toggleEditMode());
      } else {
        dispatch(setError(response.message || 'Failed to update quiz'));
      }
    } catch (err) {
      dispatch(setError('An error occurred while updating the quiz'));
      console.error(err);
    } finally {
      dispatch(setSavingChanges(false));
    }
  };

  const handleDeleteQuestion = async (questionIndex, questionId) => {
    if (!questionId || !id) return;
    
    try {
      const response = await deleteQuizQuestion(id, questionId);
      
      if (response.success) {
        dispatch(removeQuestion(questionIndex));
      } else {
        dispatch(setError(response.message || 'Failed to delete question'));
      }
    } catch (err) {
      dispatch(setError('An error occurred while deleting the question'));
      console.error(err);
    }
  };

  const handleFileChange = (fieldName, file) => {
    if (fieldName === 'coverImage') {
      setFiles({
        ...files,
        coverImage: file
      });
    }
  };
  
  const handleQuestionFileChange = (questionIndex, file) => {
    const newQuestionImages = [...files.questionImages];
    newQuestionImages[questionIndex] = file;
    console.log(files)

    setFiles({
      ...files,
      questionImages: newQuestionImages
    });
    console.log(files)
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onGoBack={() => navigate(-1)} />;
  }

  if (!quiz) {
    return (
      <div className="text-center p-4">
        <p className="text-lg text-gray-600">Quiz not found</p>
        <button 
          className="mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          onClick={() => navigate('/admin/create-quiz')}
        >
          Return to Quiz List
        </button>
      </div>
    );
  }
 
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      
      <QuizHeader 
        quiz={quiz}
        editMode={editMode}
        handleEditToggle={handleEditToggle}
        handleSaveChanges={handleSubmit} 
        savingChanges={savingChanges}
        onBack={() => navigate(-1)}
      />

      <QuizInformation 
        editMode={editMode}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
      />

      <QuizQuestions 
        onDeleteQuestion={handleDeleteQuestion}
        handleQuestionChange={handleQuestionChange}
        handleOptionChange={handleOptionChange}
        handleCorrectOptionChange={handleCorrectOptionChange}
        handleQuestionFileChange={handleQuestionFileChange}
      />

      {editMode && (
        <FloatingActionButtons 
          handleEditToggle={handleEditToggle}
          handleSaveChanges={handleSubmit} // Using handleSubmit instead of handleSaveChanges
          savingChanges={savingChanges}
        />
      )}
    </div>
  );
};

export default QuizDetailsScreen;