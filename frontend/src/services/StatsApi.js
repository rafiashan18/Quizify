import api from "../axios";

export const getAdminDashboardStats = async()=>{
    try{
        const response = await api.get("/stats/adminDashboardStats")
        console.log(response)
        return response.data;
    }
    catch(error){
        console.log("Error",response.data);
        throw error;
    }
}