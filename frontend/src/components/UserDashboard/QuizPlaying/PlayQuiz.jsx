import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { resetQuizState, checkAnswer, nextQuestion } from '../../../redux/Slices/PlayQuizSlice';
import { useNavigate } from 'react-router-dom';
import LeaveQuizConfirmation from '../../../modals/LeaveQuizConfirmation';
const PlayQuiz = ({ quiz, questions, questionIndex, checkOption}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [timer, setTimer] = useState(quiz?.timePerQuestion || 30); // Default 30 seconds per question
  const [timerActive, setTimerActive] = useState(true);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

  const { selectedOptions, isAnswersCorrect } = useSelector(state => state.playQuiz.quizData);
  const selectedOption = selectedOptions[questionIndex];
  const isAnswerCorrect = isAnswersCorrect[questionIndex];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    setTimer(quiz?.timePerQuestion || 30);
    setTimerActive(true);
  }, [questionIndex, quiz?.timePerQuestion]);
  
  useEffect(() => {
    console.log("Timer effect running. Timer:", timer, "Active:", timerActive);
    
    let interval = null;
    
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      
      console.log("Interval set, timer counting down");
    } 
    else if (timer === 0 && timerActive) {
      console.log("Timer reached zero");
      setTimerActive(false);
      
      const correctOptionIndex = Number(questions[questionIndex]?.correctOption);
      const correctOptionValue = questions[questionIndex]?.options[correctOptionIndex];
      
      if (selectedOption === null) {
        console.log("No option selected, auto-selecting correct answer");
        dispatch(checkAnswer({
          selectedOption: null,
          correctAnswer: correctOptionValue
        }));
      }
      
      setTimeout(() => {
        console.log("Moving to next question after timeout");
        dispatch(nextQuestion());
      }, 2000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("Interval cleared");
      }
    };
  }, [timer, timerActive, dispatch, questions, questionIndex, selectedOption]);
  
  useEffect(() => {
    if (selectedOption !== null) {
      console.log("Option selected, stopping timer");
      setTimerActive(false);
    }
  }, [selectedOption]);

  const gradients = {
    0: 'bg-gradient-to-b from-red-400 to-red-600',
    1: 'bg-gradient-to-b from-green-400 to-green-600',
    2: 'bg-gradient-to-b from-blue-400 to-blue-600',
    3: 'bg-gradient-to-b from-orange-400 to-orange-600',
  };

  const handleImageZoom = (image) => {
    setZoomedImage(image);
    setIsZoomed(true);
  };

  const leaveQuiz = () => {
    setShowLeaveConfirmation(true);

    dispatch(resetQuizState());
    navigate(-1);
  };

  const handleLeaveQuizClick = () => {
    setShowLeaveConfirmation(true);
  };
  
  const confirmLeaveQuiz = () => {
    dispatch(resetQuizState());
    navigate(-1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const timerProgress = (timer / (quiz?.timePerQuestion || 30)) * 100;
  
  // console.log(`Current timer: ${timer}, Active: ${timerActive}, Progress: ${timerProgress}%`);
  
  return (
    <div>
      <div className='w-full px-3 md:px-6 space-y-4 md:space-y-16'>
        <div className='space-y-3 md:space-y-6 md:pt-4 pt-1'>
          {/* Button Section  */}
          <div className="buttons-section flex justify-between items-center">
            {/* Timer display */}
            <div className="timer-container flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full ${
                    timer < 5 ? 'bg-red-500' : timer < 15 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} 
                  style={{ width: `${timerProgress}%` }}
                ></div>
              </div>
              <span className={`font-bold ${timer < 5 ? 'text-red-500' : timer < 15 ? 'text-yellow-500' : 'text-green-500'}`}>
                {formatTime(timer)}
              </span>
            </div>
            
            <h1 className='text-center flex-grow hidden md:block text-lg font-semibold'>{quiz?.title}</h1>
            <button onClick={handleLeaveQuizClick} className='border bg-purple-400 px-3 py-2 rounded-md'>Leave</button>
          </div>

          {/* Question and Image Section */}
          <div className='relative bg-white'>
            <div className='h-56  overflow-y-scroll md:overflow-hidden dark:bg-gray-800/50 py-4 md:py-6 px-3 border-2 border-yellow-400 rounded-lg'>
              {/* Badge for Question Number */}
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 border-2 border-yellow-400 text-white text-xs font-bold rounded-full h-6 w-12 flex items-center justify-center z-20'>
                {questionIndex + 1} / {questions.length}
              </div>
              
              <div className='flex h-full  border rounded-lg bg-purple-600 flex-col md:flex-row items-center justify-center gap-3 md:gap-12'>
                {questions[questionIndex]?.questionImage && (
                  <div 
                    className='max-w-full mt-2 flex relative justify-center cursor-pointer'
                    onClick={() => handleImageZoom(questions[questionIndex].questionImage)}
                  >
                    <img 
                      src={questions[questionIndex].questionImage} 
                      className='max-h-[150px] max-w-full object-contain' 
                      alt="Question" 
                    />
                    <div className='absolute bottom-0 left-0 p-2'>🔍</div>
                  </div>
                )}
                
                {questions[questionIndex]?.questionText && (
                  <div className='flex items-center border-red-500 '>
                    <h3 className='text-lg md:text-2xl font-semibold text-white text-start'>
                      {questions[questionIndex]?.questionText}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
                      
        {/* Options Section */}
        <div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:justify-around'>
            {questions[questionIndex].options.map((option, index) => {
              // Timer expired and this is the correct option
              const correctOptionIndex = Number(questions[questionIndex]?.correctOption);
              const correctOptionValue = questions[questionIndex]?.options[correctOptionIndex];
              const isCorrectOption = option === correctOptionValue;
              const timerExpired = timer === 0 && !timerActive;
              
              let className = 'text-white font-semibold flex justify-center items-center p-3 rounded-md cursor-pointer h-13 md:h-36 hover:scale-105 hover:shadow-lg hover:opacity-90 transition-transform duration-300';
             
              if (selectedOption == null && !timerExpired) {
                className += ` ${gradients[index]}`;
              } else if (timerExpired && isCorrectOption) {
                // Highlight correct answer when timer expires
                className += ' !bg-green-600 animate-pulse';
              } else if (selectedOption !== null) {
                if (selectedOption === option && isAnswerCorrect === true) {
                  className += ' !bg-green-600';
                } else if (selectedOption === option && isAnswerCorrect === false) {
                  className += ' !bg-red-600';
                } else if (isCorrectOption && isAnswerCorrect === false && selectedOption !== option) {
                  className += ' !bg-green-600';
                } else {
                  className += ' bg-gradient-to-b from-gray-400 to-gray-600';
                }
              } else {
                className += ' bg-gradient-to-b from-gray-400 to-gray-600';
              }

              return (
                <div 
                  key={index}
                  onClick={() => {
                    if (selectedOption == null && timer > 0) {
                      console.log("Option clicked:", option);
                      setTimerActive(false); // Stop timer when option is selected
                      const correctOptionValue = questions[questionIndex]?.options[correctOptionIndex];
                      checkOption(option, correctOptionValue);
                      
                      // Move to next question after showing result for 2 seconds
                      setTimeout(() => {
                        console.log("Moving to next question after selection");
                        dispatch(nextQuestion());
                      }, 2000);
                    }
                  }}
                  className={className}
                >
                  <p className='text-center text-sm md:text-base'>{option}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4'
          onClick={() => setIsZoomed(false)}
        >
          <div className='relative'>
            <button 
              onClick={() => setIsZoomed(false)} 
              className='absolute -top-10 right-0 text-white hover:text-gray-300'
            >
              ✕
            </button>
            <img 
              src={zoomedImage} 
              alt="Zoomed Question" 
              className='max-w-[90vw] max-h-[90vh] object-contain'
            />
          </div>
        </div>
      )}
      {showLeaveConfirmation && (
  <LeaveQuizConfirmation 
    onClose={() => setShowLeaveConfirmation(false)}
    leaveQuiz={confirmLeaveQuiz}
    quizTitle={quiz?.title}
  />
)}
    </div>
  )
}

export default PlayQuiz