import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: []
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            console.log("helloo")
            console.log(action.payload)
            state.quizzes.push(action.payload)
        },
        //  getQuiz: (state , action)=>{
        //     const id = action.payload.id;
        //     const userData = state.quizzes.find(quiz => quiz.id == id)
        //     return userData;
        //  },
        updateQuiz: (state, action) => {
            console.log("---------------------------")
            console.log("Updated question data at rtk  ", action.payload)
            const id = action.payload.id;
            state.quizzes = state.quizzes.map((quiz) => {
                if (quiz.id === id) {
                    return action.payload; 
                }
                return quiz; 
            });

        },
        removeQuiz:(state, action)=>{
            const id = action.payload;
            state.quizzes = state.quizzes.filter((quiz)=> quiz.id !== id);
        }
    }
});

export const {
    addQuiz,
    updateQuiz,
    addQuestionToQuiz,
    removeQuiz,
    resetQuestions
} = quizSlice.actions;

export default quizSlice.reducer;