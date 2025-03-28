import { createSlice, current } from "@reduxjs/toolkit"

// Helper functions for localStorage
const saveQuizToStorage = (quizData) => {
  try {
    localStorage.setItem('quizData', JSON.stringify(quizData));
  } catch (error) {
    console.error('Failed to save quiz to localStorage:', error);
  }
};

const getQuizFromStorage = () => {
  try {
    const storedQuiz = localStorage.getItem('quizData');
    return storedQuiz ? JSON.parse(storedQuiz) : null;
  } catch (error) {
    console.error('Failed to get quiz from localStorage:', error);
    return null;
  }
};

const clearQuizFromStorage = () => {
  try {
    localStorage.removeItem('quizData');
  } catch (error) {
    console.error('Failed to clear quiz from localStorage:', error);
  }
};

// Get initial state from localStorage if available
const storedQuiz = getQuizFromStorage();

const initialState = {
  quizData: storedQuiz || {
    quizId: null,
    title: "",
    category: "",
    difficulty: "",
    description: "",
    duration: "",
    coverImage: "",
    popularity: "",
    questionCount: "",
    questions: [],
    attempts: 0,
    currentQuestionIndex: 0,
    selectedOptions: [],
    isAnswersCorrect: [],
    score: 0,
  },
  showModel: storedQuiz ? false : false, // Default to false even if we have stored data
  quizesHistory: []
}

const PlayQuizSlice = createSlice({
  name: "PlayQuiz",
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.quizData = { 
          ...action.payload, 
          currentQuestionIndex: 0, 
          score: 0,
          selectedOptions: new Array(action.payload.questions?.length || 0).fill(null),
          isAnswersCorrect: new Array(action.payload.questions?.length || 0).fill(null)
      };
      saveQuizToStorage(state.quizData);
    },
  
    setSelectedOption: (state, action) => {
      state.quizData.selectedOptions[state.quizData.currentQuestionIndex] = action.payload;
      saveQuizToStorage(state.quizData);
    },
    
    checkAnswer: (state, action) => {
      const { selectedOption, correctAnswer } = action.payload;
      
      state.quizData.selectedOptions[state.quizData.currentQuestionIndex] = selectedOption || null;
      state.quizData.isAnswersCorrect[state.quizData.currentQuestionIndex] = selectedOption === correctAnswer;
      
      if (state.quizData.isAnswersCorrect[state.quizData.currentQuestionIndex]) {
        state.quizData.score += 1;
      }
      
      saveQuizToStorage(state.quizData);
    },
    
    nextQuestion: (state) => {
      if (state.quizData.currentQuestionIndex < state.quizData.questions.length - 1) {
        state.quizData.currentQuestionIndex += 1;
        saveQuizToStorage(state.quizData);
      } else {
        state.showModel = true;
        
        // Keep this for backward compatibility with other components
        const quizDetails = {
          quizTitle: state.quizData.title,
          quizId: state.quizData.quizId,
          score: state.quizData.score,
          date: new Date().toISOString(),
          questions: state.quizData.questions.map((question, index) => ({
            questionText: question.questionText,
            options: question.options,
            correctAnswer: question.options[Number(question.correctOption)],
            selectedAnswer: state.quizData.selectedOptions[index] || null
          }))
        }
        
        const existingQuizIndex = state.quizesHistory.findIndex(quiz => quiz.quizId === state.quizData.quizId);
        if (existingQuizIndex !== -1) {
          state.quizesHistory[existingQuizIndex] = quizDetails;
        } else {
          state.quizesHistory.push(quizDetails);
        }
        
        saveQuizToStorage(state.quizData);
      }
    },
    
    resetQuizState: (state) => {
      state.quizData = initialState.quizData;
      state.showModel = initialState.showModel;
      clearQuizFromStorage();
    },
    
    clearQuizData: (state) => {
      state.quizData = initialState.quizData;
      state.showModel = false;
      clearQuizFromStorage();
    }
  }
})

export const {
  setQuiz,
  setSelectedOption,
  checkAnswer,
  nextQuestion,
  resetQuizState,
  clearQuizData
} = PlayQuizSlice.actions;

export default PlayQuizSlice.reducer;