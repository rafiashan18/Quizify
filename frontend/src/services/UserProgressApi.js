import api from "../axios";

export const saveUserProgress = async(progressData) => {
    try {
        const response = await api.post('/userProgress/', progressData);
        return response.data;
    } catch (error) {
        console.error("Error saving user progress:", error);
        throw error; 
    }
}

export const getAllUserProgress = async(userId) => {
    try{
        const response = await api.post('/userProgress/getAllUserProgress', {userId});
        return response.data;
    }
    catch(error){
        console.error("Error saving user progress:", error);
        throw error; 
    }
}

export const getUserProgress = async(quizId) => {
    try{
        const response = await api.get(`/userProgress/getSpecificQuizProgress/${quizId}`);
        return response.data;
    }
    catch(error){
        console.error("Error getting user progress:", error);
        throw error; 
    }
}


export const getUserProgressStats = async () => {
    try{
        const response = await api.get("/userProgress/getUserDashboardStats")
        return response.data
    }
    catch(error){
        console.error("Error getting user stats:", error);
        throw error;
    }
}
export const getLatestQuizzes = async () => {
    try{
        const response = await api.get("/userProgress/getLatestQuizzes")
        return response.data
    }
    catch(error){
        console.error("Error getting latest  quizes:", error);
        throw error;
    }
}