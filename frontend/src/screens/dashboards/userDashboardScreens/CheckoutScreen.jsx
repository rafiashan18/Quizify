import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useParams } from 'react-router-dom'
import CheckoutForm from '../../../forms/CheckoutForm'
import { processPayment } from '../../../services/PaymentApi' 

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutScreen = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { quizId, amount } = useParams();

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const data = {
          amount: Number(amount),
          quizId: quizId
        };
        console.log(amount)
        const response = await processPayment(data);
        
        if (response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          setError("Failed to initialize payment");
        }
      } catch (err) {
        setError("Error setting up payment: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [quizId, amount]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading payment...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#A020F0',
      },
    },
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Purchase</h2>
      <div className="mb-6">
        <p className="text-gray-700 mb-2">Quiz Amount:</p>
        <p className="text-xl font-bold">${amount}</p>
      </div>
      
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm quizId={quizId} amount={amount} />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutScreen;