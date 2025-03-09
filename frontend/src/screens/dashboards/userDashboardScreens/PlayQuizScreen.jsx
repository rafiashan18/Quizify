import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import quizData from '../../../constants/quizData'
import PlayQuiz from '../../../components/userComponents/QuizPlaying/PlayQuiz';
import ResultModel from '../../../components/commonComponents/ResultModel';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption , checkAnswer, setQuizData , nextQuestion , resetQuizState } from '../../../redux/Slices/PlayQuizSlice';
const PlayQuizScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch();

    const {
        quizData:quiz,
        showModel,
    } = useSelector(state => state.playQuiz)

    useEffect(() => {

        const data = quizData.getQuiz(id)
        if (data.length) {
            dispatch(resetQuizState());
            dispatch(setQuizData(data[0]))
        }
    }, [id, dispatch])

    // MCQS checker
    const checkOption = (option, correctOption) => {
        setSelectedOption(option)
        dispatch(checkAnswer({
            selectedOption: option,
            correctAnswer: correctOption
        }));  
        if (option === correctOption) {
            toast.success(
                "Correct !",{
                    position:'top-right',
                    autoClose:1000,
                    hideProgressBar:false,
                    closeonClick:true,
                    pauseOnHover: false,
                    draggable:false
                }
            )
        } else {
        
            toast.error("Incorrect",{
                position:'top-right',
                autoClose:1000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:false,
                draggable:false
            })
        }

       
        setTimeout(() => {
           dispatch(nextQuestion())
           
        }, 1500);
    };
    
    return (
        <div className=''>
            {quiz.questions.length ? (
               <div>
                 <PlayQuiz 
                    quiz={quiz}
                    questions={quiz.questions}
                    questionIndex={quiz.currentQuestionIndex}
                    checkOption={checkOption}
                   
                />
                {
                     
                  showModel && <ResultModel score={quiz.score} total={quiz.questions.length}/>
                      
                }
               </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default PlayQuizScreen;