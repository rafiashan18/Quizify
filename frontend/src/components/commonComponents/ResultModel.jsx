import React from 'react'
import { useNavigate } from 'react-router-dom'
import { resetQuizState } from '../../redux/Slices/PlayQuizSlice';
import { useDispatch } from 'react-redux';
const ResultModel = ({ score, total }) => {
  const navigate = useNavigate();
  const percentage = ((score / total) * 100);
  const dispatch = useDispatch();
  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! 🏆";
    if (percentage >= 75) return "Great Job! 👍";
    if (percentage >= 50) return "Good Effort 👌";
    return "Keep Practicing 💪";
  };
   const NavigateDashboard = () => {
    dispatch(resetQuizState())
    navigate(-1)
   }
  return (
   <div className=''>
     <div className='fixed p-2  inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-white rounded-xl shadow-2xl p-8 w-96 relative'>
        <button 
          onClick={NavigateDashboard } 
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>

        <div className='text-center space-y-4'>
          <h2 className='text-3xl font-bold text-purple-600'>Quiz Result</h2>
          
          <div className='bg-purple-50 rounded-lg p-4'>
            <p className='text-xl font-semibold'>
              Score: <span className='text-purple-600'>{score}</span> / {total}
            </p>
            <p className='text-lg text-gray-600'>
              {percentage}%
            </p>
          </div>

          <div className='text-2xl font-bold'>
            {getResultMessage()}
          </div>

          <div className='flex justify-center space-x-4 pt-4'>
            <button 
              onClick={NavigateDashboard}
              className='bg-purple-500 text-white px-6 py-2 rounded-md hover:bg-purple-600 transition'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default ResultModel