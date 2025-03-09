import { ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const WelcomeAdmin = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('Admin')
    return (
        <div className=' flex justify-center items-center h-full'>
            <div className=" ">
                <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-2 md:p-5 shadow-lg
                space-y-6">
                    <h1 className="text-lg md:text-2xl font-bold text-white ">
                       Welcome to <span className=' Your border-b-2 border-yellow-300'>Your Dashboard</span>
                    </h1>
                    <p className="text-purple-100 text-sm max-w-xl ">
                        As an admin, you play a crucial role in shaping the learning experience.
                        Manage quizzes effectively, monitor user progress, and ensure that our
                        platform remains engaging and educational. 
                    </p>
                    {/* {latestQuiz && (
            <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm">
              <p className="text-white text-sm mb-2">Latest Quiz Completed:</p>
              <p className="text-white font-semibold">{latestQuiz.quizTitle}</p>
              <p className="text-purple-100">
                Score: {latestQuiz.score}/{latestQuiz.questions.length} 
                ({((latestQuiz.score / latestQuiz.questions.length) * 100).toFixed(0)}%)
              </p>
            </div>
          )} */}
                   <div className='flex gap-3'>
                   <button
                        onClick={() => navigate('/admin/create-quiz')}
                        className="inline-flex items-center gap-2 bg-white text-purple-600 px-2 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors duration-200 text-sm">
                        Add Quiz
                        <ChevronRight className="w-3 h-3" />
                    </button>
                    <button
                        onClick={() => navigate('/admin/display-quizes')}
                        className="inline-flex items-center gap-2 bg-yellow-500 text-white px-2 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 text-sm">
                        View All 
                        <ChevronRight className="w-3 h-3" />
                    </button>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default WelcomeAdmin