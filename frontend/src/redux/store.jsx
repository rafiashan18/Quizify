import {configureStore} from '@reduxjs/toolkit'
import themeReducer from './Slices/themeSlice'
// import quizReducer from './Slices/quizSlice'
import quizReducer from './Slices/QuizSlice'

const store = configureStore(
    {
        reducer:{
        theme:themeReducer,
        quiz:quizReducer,
        
        }
    }
)

export default store;