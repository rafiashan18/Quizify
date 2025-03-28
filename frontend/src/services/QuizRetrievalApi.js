import api from "../axios";

export const allCategoriesByLimited = async ()=>{
    try{
        const response = await api.get('/quizRetrieval/allCategoriesByLimited')
        return response.data;
    }
    catch(error){
        console.error('Error fetching quizzes:', error);
        return {
            success: false,
            message: 'Failed to fetch quizzes',
            error: error.message
        };
    }
}

export const LimitedQuizBYCategoryAndType = async(category)=>{
    try{
        const response = await api.get(`/quizRetrieval/getLimitedQuizBYCategoryAndType/${category}`)
        return response.data;
    }
    catch(error){
        console.error('Error fetching quizzes:', error);
        return {
            success: false,
            message: 'Failed to fetch quizzes',
            error: error.message
        };
    }
}

export const AllQuizzesByCategoryAndType = async(category,type)=>{
    try{
        const response = await api.get(`/quizRetrieval/getAllQuizzesByCategoryAndType/${category}`,{
            params:{type}
        })
        return response.data;
    }
    catch(error){
        console.error('Error fetching quizzes:', error);
        return {
            success: false,
            message: 'Failed to fetch quizzes',
            error: error.message
        };
    }
}