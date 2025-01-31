import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
// import quizReducer from './Slices/quizSlice'
import quizReducer from './Slices/QuizSlice'
import playQuizReducer from './Slices/PlayQuizSlice'
const store = configureStore(
    {
        reducer:{
        theme:themeReducer,
        quiz:quizReducer,
        playQuiz:playQuizReducer,
        }
    }
)

export default store;