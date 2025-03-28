import React from 'react'
import { AlertCircle } from 'lucide-react'

const LeaveQuizConfirmation = ({ onClose, leaveQuiz, quizTitle }) => {
  return (
    <div className="fixed inset-0 modal-zIndex overflow-auto bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-2xl w-full m-4">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="mb-4">
            <AlertCircle className="w-16 h-16 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Leave Quiz
          </h2>
          <p className="text-gray-600 mb-2">
            Are you sure you want to leave the quiz
          </p>
          <p className="text-lg font-semibold text-purple-600">
            {quizTitle}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Your current progress will be lost.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border-2 border-gray-200 
                     text-gray-700 font-medium hover:bg-gray-50 
                     transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={leaveQuiz}
            className="px-6 py-2.5 rounded-lg bg-red-500 text-white 
                     font-medium hover:bg-red-600 transition-colors 
                     duration-200 flex items-center justify-center"
          >
            Leave Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaveQuizConfirmation