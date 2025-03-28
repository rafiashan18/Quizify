import api from '../axios'

// Profile user update 
export const updateUser = async (data) => {
    try {
        console.log("Updating user data:", data);
        const response = await api.put('/user/updateUser', data);
        return response.data;
    } catch (err) {
        console.error("Error updating user:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// Profile api 
export const uploadProfilePicture = async (file) => {
    try {
        console.log(file)
        console.log("Preparing to upload file:", file.name, file.type, file.size);
        
        const formData = new FormData();
        formData.append('profileImage', file);
        
        console.log("FormData created with file");
        
        const response = await api.post('/user/uploadProfilePicture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log("Upload successful, response:", response.data);
        return response.data;
    } catch (err) {
        console.error("Error uploading profile picture:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// Get All users 
export const getAllUsers = async () => {
    try {
        const response = await api.get('/user/showUsers');
        return response.data;
    } catch (err) {
        console.error("Error fetching users:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// Toggle user status (block/active)
export const toggleUserStatus = async (userId, status) => {
    try {
        console.log(userId)
        const response = await api.put(`/user/${userId}/status`, { status });
        return response.data;
    } catch (err) {
        console.error("Error updating user status:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// delete user 
export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`/user/${userId}/deleteUser`)
        return response.data;
    }
    catch(err) {
        console.error("Error deleting user:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// add user
export const addUser = async (formData) => {
    try {
        console.log(formData)
        const response = await api.post('/user/addUser', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
    catch(err) {
        console.error("Error in adding user:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

//add purchased quiz 
export const addPurchasedQuiz = async (quizId) => {
    try{
        console.log("quiz id :",quizId)
        const response = await api.post('/user/addPurchasedQuiz',{quizId})
        return response.data
    }
    catch(err){
        console.error("Error in adding purchased quiz:", err);
        console.error("Response data:", err.response?.data);
        throw err;
    }
}

// check purchased quizes 

export const isQuizPurchased = async (quizId)=>{
    try{
        const response = await api.get(`/user/checkQuizPurchasedStatus/${quizId}`)
        return response.data;
    }
    catch(error){
        console.error("Error in fetching quiz purchase status :", error);
        console.error("Response data:", error.response?.data);
        throw error;
    }
}