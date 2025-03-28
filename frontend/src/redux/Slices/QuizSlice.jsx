import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: null,
  editedQuiz: null,
  loading: true,
  error: null,
  editMode: false,
  savingChanges: false,
  expandedQuestion: null
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quiz = action.payload;
      if (!state.editedQuiz) {
        state.editedQuiz = action.payload;
      }
    },
    setEditedQuiz: (state, action) => {
      state.editedQuiz = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    toggleEditMode: (state) => {
      state.editMode = !state.editMode;
      // Reset editedQuiz to original quiz when exiting edit mode
      if (!state.editMode) {
        state.editedQuiz = state.quiz;
      }
    },
    setSavingChanges: (state, action) => {
      state.savingChanges = action.payload;
    },
    setExpandedQuestion: (state, action) => {
      state.expandedQuestion = action.payload;
    },
    updateQuizField: (state, action) => {
      const { name, value } = action.payload;
      if (state.editedQuiz) {
        state.editedQuiz = {
          ...state.editedQuiz,
          [name]: value
        };
      }
    },
    updateQuestionField: (state, action) => {
      const { questionIndex, field, value } = action.payload;
      if (state.editedQuiz && state.editedQuiz.questions) {
        const updatedQuestions = [...state.editedQuiz.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          [field]: value
        };
        
        state.editedQuiz = {
          ...state.editedQuiz,
          questions: updatedQuestions
        };
      }
    },
    updateQuestionOption: (state, action) => {
      const { questionIndex, optionIndex, value } = action.payload;
      if (state.editedQuiz && state.editedQuiz.questions) {
        const updatedQuestions = [...state.editedQuiz.questions];
        
        // Initialize options array if it doesn't exist
        if (!updatedQuestions[questionIndex].options) {
          updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            options: []
          };
        }
        
        const updatedOptions = [...updatedQuestions[questionIndex].options];
        updatedOptions[optionIndex] = value;
        
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          options: updatedOptions
        };
        
        state.editedQuiz = {
          ...state.editedQuiz,
          questions: updatedQuestions
        };
      }
    },
    updateCorrectOption: (state, action) => {
      const { questionIndex, value } = action.payload;
      if (state.editedQuiz && state.editedQuiz.questions) {
        const updatedQuestions = [...state.editedQuiz.questions];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          correctOption: value
        };
        
        state.editedQuiz = {
          ...state.editedQuiz,
          questions: updatedQuestions
        };
      }
    },
    removeQuestion: (state, action) => {
      const questionIndex = action.payload;
      if (state.quiz && state.quiz.questions && state.editedQuiz && state.editedQuiz.questions) {
        // Update both quiz and editedQuiz
        state.quiz = {
          ...state.quiz,
          questions: state.quiz.questions.filter((_, i) => i !== questionIndex)
        };
        
        state.editedQuiz = {
          ...state.editedQuiz,
          questions: state.editedQuiz.questions.filter((_, i) => i !== questionIndex)
        };
      }
    }
    ,
    resetEditedQuiz: (state) => {
      state.editedQuiz = null;
      state.editMode=false
    },
    addNewQuestion: (state, action) => {
      // Add to both the main quiz and editedQuiz
      if (state.quiz) {
        if (!state.quiz.questions) {
          state.quiz.questions = [];
        }
        state.quiz.questions.push(action.payload);
      }
      
      if (state.editedQuiz) {
        if (!state.editedQuiz.questions) {
          state.editedQuiz.questions = [];
        }
        state.editedQuiz.questions.push(action.payload);
      }
    },
    
  }
});

export const {
  setQuiz,
  setEditedQuiz,
  setLoading,
  setError,
  toggleEditMode,
  setSavingChanges,
  setExpandedQuestion,
  updateQuizField,
  updateQuestionField,
  updateQuestionOption,
  updateCorrectOption,
  removeQuestion,
  resetEditedQuiz,
  addNewQuestion
} = quizSlice.actions;

export default quizSlice.reducer;