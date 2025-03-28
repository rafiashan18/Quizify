import api from "../axios"

export const processPayment = async (data) => {
    try{
        const response = await api.post('/payments/create-payment-intent',data)
        return response.data
    }
    catch(error){
        console.error('Error processing payment:', error);
        return {
            success: false,
            message: 'Failed to process payment',
            error: error.message
        };
    }
}