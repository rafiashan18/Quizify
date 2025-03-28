import api from "../axios"

export const createMessage = async (message)=>{
    try{
        const response = api.post('message/createMessage',message)
        return (await response).data
    }
    catch(error){
        console.error('Error sending query:', error);
        return {
            success: false,
            message: 'Failed to send query',
            error: error.message
        };
    }
}

export const deleteMessage = async (id)=>{
    try{
        const response = api.delete(`message/deleteMessage/${id}`)
        return (await response).data
    }
    catch(error){
        console.error('Error deleting message', error);
        return {
            success: false,
            message: 'Failed to delete message',
            error: error.message
        };
    }
}

export const resolveMessage = async (id)=>{
    try{
        const response = api.update(`message/resolveMessage/${id}`)
        return (await response).data
    }
    catch(error){
        console.error('Error resolving query', error);
        return {
            success: false,
            message: 'Failed to resolve query',
            error: error.message
        };
    }
}

export const showAllMessages = async () =>{
    try{
        const response = api.get(`message/showAllMessages`)
        return (await response).data
    }
    catch(error){
        console.error('Error getting messages', error);
        return {
            success: false,
            message: 'Failed to get messages',
            error: error.message
        };
    }
}

export const sendReply = async (id,reply) =>{
    try{
        const response = api.post(`message/sendReply/${id}`,reply)
        return (await response).data
    }
    catch(error){
        console.error('Error sending messages', error);
        return {
            success: false,
            message: 'Failed to send messages',
            error: error.message
        };
    }
}

