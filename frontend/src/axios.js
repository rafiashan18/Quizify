import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/", 
    withCredentials: true, 
});

 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("Token"); 
        if (token) {
            // console.log(token)
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
