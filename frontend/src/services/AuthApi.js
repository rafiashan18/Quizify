import api from '../axios'

// Login API
export const login = async (data) => {
    try {
        console.log("Inside auth api login")
        const response = await api.post("/auth/login", data);
        console.log("Log in  data :",data)
        console.log(response.data)
        return response.data; 
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Signup API
export const signup = async (data) => {
    try {
        const response = await api.post("/auth/signup", data);
        console.log("Sign up data :",data)
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Signup failed";
    }
};

// Logout API
export const logout = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Logout failed";
    }
};

export const getUser = async () => {
    try {
        const response = await api.post(`/auth/me`);
        return response.data;
    }
    catch (err) {
        throw err.response?.data?.message || "Fetching user details Failed";
    }
}