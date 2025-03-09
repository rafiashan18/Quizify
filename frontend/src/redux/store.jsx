import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
// import quizReducer from './Slices/quizSlice'
import quizReducer from './Slices/QuizSlice'
import playQuizReducer from './Slices/PlayQuizSlice'
import authReducer from './Slices/authSlice'
import userReducer from './Slices/UserSlice'
const store = configureStore(
    {
        reducer:{
        theme:themeReducer,
        quiz:quizReducer,
        playQuiz:playQuizReducer,
        auth: authReducer,
        user:userReducer
        }
    }
)

export default store;