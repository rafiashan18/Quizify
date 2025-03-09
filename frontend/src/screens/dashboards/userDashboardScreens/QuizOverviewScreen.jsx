import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import quizData from '../../../constants/quizData'
import PlayDetails from '../../../components/userComponents/QuizPlaying/PlayDetails'
const QuizOverviewScreen = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [quiz, setQuizData] = useState();

    useEffect(
        () => {
            const data = quizData.getQuiz(id)
            setQuizData(data[0])

        }, []
    )

    const PlayQuiz = () => {
        navigate(`/user/play-start/${id}`)
    }

    return (
        <div className='p-3  '>
            <div className='w-full md:min-h-[520px] h-full bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 '>
                {
                    quiz ?
                        <div className='p-3 space-y-6 m-5'>
                            <PlayDetails title={quiz.title} category={quiz.category} description={quiz.description} image={quiz.imageUrl}  />
                          <div>
                          <button
                                className=' p-3 border border-purple-400  bg-purple-500  text-white font-semibold 
                                rounded-md  hover:bg-purple-600  transition duration-300 ease-in-out  shadow-md 
                                focus:outline-none focus:ring-2 focus:ring-purple-300 
                                focus:ring-opacity-50'
                                onClick={() => PlayQuiz()}>Start Now</button>
                          </div>
                        </div>
                        :
                        <div className='p-6 border h-full flex justify-center items-center'>
                            <div className='text-center'>
                                <h4 className='text-lg'>Quiz Details Not Found</h4>
                                <Link to='/user/' className='text-purple-400 font-semibold'>Explore More Quizes</Link>

                            </div>
                        </div>
                }


                <div>

                </div>
            </div>
        </div>
    )
}

export default QuizOverviewScreen