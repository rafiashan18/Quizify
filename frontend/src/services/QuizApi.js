import api from '../axios'

export const addQuiz = async (data) => {
    try {
        console.log("Showing data from frontend API:");
        for (let pair of data.entries()) {
            console.log(pair[0], pair[1]);
        }

        const response = await api.post('quiz/addQuiz', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }

        });

        console.log(response.data);

    } catch (error) {
        throw error;
    }
};


export const getAllQuizzes = async () => {
    try {
        const response = await api.get('quiz/showQuizes');
        return response.data;
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return {
            success: false,
            message: 'Failed to fetch quizzes',
            error: error.message
        };
    }
};

export const getQuizById = async (id) => {
    try {
        const response = await api.get(`/quiz/getQuizById/${id}`);
        // const data = await response.json();
        return response.data;
    } catch (error) {
        console.error(`Error fetching quiz with ID ${id}:`, error);
        return {
            success: false,
            message: 'Failed to fetch quiz details',
            error: error.message
        };
    }
};


export const updateQuiz = async (id, quizData) => {
    try {
        console.log(quizData)
        
        const response = await api.put(`/quiz/updateQuizById/${id}`,quizData,{
            headers:{
                "Content-Type":'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating quiz with ID ${id}:`, error);
        return {
            success: false,
            message: 'Failed to update quiz',
            error: error.message
        };
    }
};

export const deleteQuiz = async (id) => {
    try {
        const response = await api.delete(`/quiz/deleteQuiz/${id}`)
        return response.data;
    } catch (error) {
        console.error(`Error deleting quiz with ID ${id}:`, error);
        return {
            success: false,
            message: 'Failed to delete quiz',
            error: error.message
        };
    }
};

export const deleteQuizQuestion = async (quizId, questionId) => {
    try {
        const response = await api.delete(`/quiz/${quizId}/deleteQuestion/${questionId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting question with ID ${questionId} from quiz ${quizId}:`, error);
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to delete question',
            error: error.message
        };
    }
}

export const searchQuizzes = async (query) => {
    try {
      const response = await api.get(`/quiz/getQuizSearchResults?query=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Search quizzes error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to search quizzes';
      throw new Error(errorMessage);
    }
  };