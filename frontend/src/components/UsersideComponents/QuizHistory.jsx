import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import QuizHistoryCard from './QuizHistoryCard'

const QuizHistory = () => {
  const quizesHistory = useSelector(state => state.playQuiz.quizesHistory)
  useEffect(
    () => {
      console.log(quizesHistory)
    }, [quizesHistory]
  )
  return (
    <div className='  p-2 md:p-4'>
      <div className='grid grid-col-1 md:grid-cols-3 gap-x-5 gap-y-7
        '>

        {

          quizesHistory.map(quizHistory => (
            <QuizHistoryCard quizHistory={quizHistory} />
          ))

        }

      </div>
    </div>
  )
}

export default QuizHistory