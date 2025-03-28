import { useSearchParams } from "react-router-dom";

const PaymentSuccessfulScreen = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("quizId");
    const paymentId = searchParams.get("paymentId");
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful! ✅</h2>
        <p className="text-gray-700">Thank you for your purchase.</p>
        
        {quizId && (
          <p className="mt-2 text-gray-500">You have successfully unlocked Quiz ID: <strong>{quizId}</strong></p>
        )}

        <button
          className="mt-6 px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
          onClick={() => window.location.href = `/user/play-quiz/${quizId}`}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessfulScreen;
