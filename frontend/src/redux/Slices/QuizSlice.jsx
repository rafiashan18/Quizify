import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    questions: []
};

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            state.quizzes.push({
                id: action.payload.id,
                title: action.payload.title,
                questions: []
            });
        },
        addQuestionToQuiz: (state, action) => {
            const { quizId, question } = action.payload;
            const quiz = state.quizzes.find((q) => q.id === quizId);
            if (quiz) {
                const questionId = state.questions.length + 1;
                state.questions.push({ id: questionId, ...question });
                quiz.questions.push(questionId);
            }
        },
        // updateQuestion: (state, action) => {
        //     const { questionId, updatedData } = action.payload;
        //     const question = state.questions.find((q) => q.id === questionId);
        //     if (question) {
        //         Object.assign(question, updatedData);
        //     }
        // },
        // deleteQuestion: (state, action) => {
        //     const { quizId, questionId } = action.payload;
        //     state.questions = state.questions.filter((q) => q.id !== questionId);
        //     const quiz = state.quizzes.find((q) => q.id === quizId);
        //     if (quiz) {
        //         quiz.questions = quiz.questions.filter((id) => id == questionId);
        //     }
        // },
        removeQuiz: (state, action) => {
            const quizId = action.payload;
            const quiz = state.quizzes.find((q) => q.id === quizId);
            if (quiz) {
                state.questions = state.questions.filter(
                    (q) => !quiz.questions.includes(q.id)
                );
            }
            state.quizzes = state.quizzes.filter((quiz) => quiz.id !== quizId);
        },
        resetQuestions: (state) => {
            state.questions = [];
        }
    }
});

export const {
    addQuiz,
    addQuestionToQuiz,
    updateQuestion,
    deleteQuestion,
    removeQuiz,
    resetQuestions
} = quizSlice.actions;

export default quizSlice.reducer;