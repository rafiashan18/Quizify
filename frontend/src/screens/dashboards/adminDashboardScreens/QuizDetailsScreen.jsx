import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById, updateQuiz, deleteQuizQuestion } from '../../../services/QuizApi';
import QuizHeader from '../../../components/AdminComponents/Quiz/QuizHeader';
import QuizInformation from '../../../components/AdminComponents/Quiz/QuizInformation';
// import QuizQuestions from '../../../components/AdminComponents/Quiz/questionComponents/QuizQuestions';
import QuizQuestions from '../../../components/AdminComponents/Quiz/questionComponents/QuizQuestion';
import LoadingSpinner from '../../../components/commonComponents/LoadingSpinner';
import ErrorMessage from '../../../components/commonComponents/ErrorMessage';
import FloatingActionButtons from '../../../components/AdminComponents/Quiz/FloatingActionButtons';
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
  resetEditedQuiz
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

  const handleSaveChanges = async () => {
    try {
      dispatch(setSavingChanges(true));
      const response = await updateQuiz(id, editedQuiz);
      
      if (response.success) {
        dispatch(setQuiz(editedQuiz));
        dispatch(toggleEditMode());
        // Show success notification or feedback
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

  const handleFileChange = () => {
    
  }
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
        handleSaveChanges={handleSaveChanges}
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
      />

      {editMode && (
        <FloatingActionButtons 
          handleEditToggle={handleEditToggle}
          handleSaveChanges={handleSaveChanges}
          savingChanges={savingChanges}
        />
      )}
    </div>
  );
};


export default QuizDetailsScreen;