import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PlayQuiz from '../../../components/UserDashboard/QuizPlaying/PlayQuiz';
import ResultModel from '../../../modals/ResultModel';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption, checkAnswer, nextQuestion } from '../../../redux/Slices/PlayQuizSlice';
import LoadingSpinner from '../../../components/Common/LoadingSpinner';
import ToastService from '../../../services/ToastService';
import { saveUserProgress } from '../../../services/UserProgressApi';

const PlayQuizScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch();

    const {
        quizData: quiz,
        showModel,
        loading
    } = useSelector(state => state.playQuiz)

    useEffect(() => {
      const saveProgress = async () => {
        if (showModel) {
          try {
            const responses = quiz.questions.map((question, index) => ({
              questionId: question.questionId || `question-${index}`,
              selectedOption: quiz.selectedOptions[index] || null,
              isCorrect: quiz.isAnswersCorrect[index] || false
            }));

            const progressData = {
              quizId: quiz.quizId,
              quizTitle: quiz.title,
              score: quiz.score,
              totalQuestions: quiz.questions.length,
              correctAnswers: quiz.score,
              responses: responses,
              attemptedAt: new Date().toISOString()
            };
            console.log(progressData)
            console.log("Sending req to frontend api");
            const response = await saveUserProgress(progressData);
            console.log('Progress saved successfully:', response);
          } catch (error) {
            console.error('Failed to save progress:', error);
            ToastService.error("Failed to save your progress");
          }
        }
      };
      
      saveProgress();
    }, [showModel, quiz]);
        
    const checkOption = (option, correctOption) => {
        dispatch(setSelectedOption(option));
        console.log(correctOption, option);
        dispatch(checkAnswer({
            selectedOption: option,
            correctAnswer: correctOption
        }));
        
        if (option === correctOption) {
            ToastService.success("Correct!", { autoClose: 1000 });
        } else {
            ToastService.error("Incorrect", { autoClose: 1000 });
        }

        setTimeout(() => {
            dispatch(nextQuestion())
        }, 1500);
    };
    
    return (
        <div className="container mx-auto px-4">
            {loading ? 
            <div className='border'>
              <LoadingSpinner />
             
            </div> : quiz?.questions?.length ? (
                <div>
                    <PlayQuiz 
                        quiz={quiz}
                        questions={quiz.questions}
                        questionIndex={quiz.currentQuestionIndex}
                        checkOption={checkOption}
                    />
                    {showModel && <ResultModel score={quiz.score} total={quiz.questions.length} />}
                </div>
            ) : (
                <LoadingSpinner />
            )}
        </div>
    );
};

export default PlayQuizScreen;
