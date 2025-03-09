  import { createSlice , current } from "@reduxjs/toolkit"
  import quizData from "../../constants/quizData";

  const initialState = {
    quizData: {
      quizId: null,
      title: "",
      category:"",
      difficulty:"",
      description:"",
      duration:"",
      imageUrl:"",
      popularity:"",
      questionCount:"",
      questions: [],
      attempts:0,
      currentQuestionIndex: 0,
      selectedOptions: [],
      isAnswersCorrect: [],
      score: 0,
    },
    showModel:false,
    quizesHistory:[
     
    ]
  }

  const PlayQuizSlice = createSlice({
    name: "PlayQuiz",
    initialState,
    reducers: {
      setQuizData: (state, action) => {
        state.quizData = { 
          ...action.payload, 
          currentQuestionIndex: 0, 
          score: 0,
          selectedOptions: new Array(action.payload.questions.length).fill(null),
          isAnswersCorrect: new Array(action.payload.questions.length).fill(null)
        };
      },
      setSelectedOption: (state, action) => {
        // console.log(current(action.payload))
        console.log("hello")
        state.quizData.selectedOptions[state.quizData.currentQuestionIndex] = action.payload;
      },
      checkAnswer: (state, action) => {
        const { selectedOption, correctAnswer } = action.payload;
        
        // Set selectedOption and isAnswerCorrect
        state.quizData.selectedOptions[state.quizData.currentQuestionIndex] = selectedOption || null;
        state.quizData.isAnswersCorrect[state.quizData.currentQuestionIndex] = selectedOption === correctAnswer ;
        
        // Update score if answer is correct
        if (state.quizData.isAnswersCorrect[state.quizData.currentQuestionIndex]) {
          state.quizData.score += 1;
        }
      },
      nextQuestion: (state) => {
        if (state.quizData.currentQuestionIndex < state.quizData.questions.length - 1) {
          state.quizData.currentQuestionIndex += 1;
          state.quizData.selectedOptions;
          state.quizData.isAnswersCorrect ;
        } else {
          state.showModel = true;
          const quizDetails =  {
            quizTitle:state.quizData.title,
            quizId: state.quizData.quizId,
            score: state.quizData.score,
            date: new Date().toISOString(),
            questions: state.quizData.questions.map((question, index)=>( {
              questionText: question.questionText,
              options: question.options,
              correctAnswer: question.correctAnswer,
              selectedAnswer: state.quizData.selectedOptions[index] || null

            }))
          }
          // const isPresent= state.quizesHistory.find(state.quizData.quizId)
          const existingQuizIndex = state.quizesHistory.findIndex(quiz => quiz.quizId === state.quizData.quizId);

          if (existingQuizIndex !== -1) {
            // Update the existing quiz
            state.quizesHistory[existingQuizIndex] = quizDetails;
          } else {
            // Add the new quiz details
            state.quizesHistory.push(quizDetails);
          }
        }
      },
      resetQuizState: (state) => {
          state.quizData = initialState.quizData;
          state.showModel = initialState.showModel;  
         },
    }
  })

  export const {
    setQuizData,
    setSelectedOption,
    checkAnswer,
    nextQuestion,
    resetQuizState,
  } = PlayQuizSlice.actions;

  export default PlayQuizSlice.reducer;