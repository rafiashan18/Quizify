import React, { useState, useEffect } from 'react';
import QuizReview from './QuizReview';
import QuizDetails from './QuizDetails';
import QuestionForm from './QuestionForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addQuiz, updateQuiz } from '../../../redux/Slices/QuizSlice';
import { v4 as uuidv4 } from 'uuid'
import QuizLayout from './QuizLayout';
import QuizNavigation from './QuizNavigation';
import QuizStepper from './QuizStepper';
const QuizCreator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const idParam = useParams();
  const quiziz = useSelector((state) => state.quiz.quizzes)


  const [quizDetails, setQuizDetails] = useState({
    title: 'Untitled',
    category: 'Untitled',
    numberOfQuestions: 1
  });

  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
+
  useEffect(() => {
    const numQuestions = quizDetails.numberOfQuestions;
    if (numQuestions <= 0) return;
    const newQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      newQuestions[i] = questions[i] || {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      };
    }

    setQuestions(newQuestions);
  }, [quizDetails.numberOfQuestions]);

  useEffect(
    () => {
      if (idParam.id) {
        console.log("params:", idParam)
        const quizData = quiziz.find(quiz => quiz.id === idParam.id);
        console.log("updated data")
        const quizDetails = {
          'title': quizData.title,
          'category': quizData.category,
          'numberOfQuestions': quizData.numberOfQuestions,
        }
        const normalizedQuestions = Array.isArray(quizData.questions[0])
          ? quizData.questions[0] 
          : quizData.questions;    
        setQuizDetails(quizDetails)
        setQuestions(normalizedQuestions);
        setCurrentQuestionIndex(0);
      }
    }, []
  )

  const handleQuizDetailsChange = (e) => {
    const { name, value } = e.target;
    setQuizDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuestionChange = (field, value, optionIndex = null) => {
    setQuestions(prev => {
      const newQuestions = [...prev];
      if (optionIndex !== null) {
        newQuestions[currentQuestionIndex] = {
          ...newQuestions[currentQuestionIndex],
          options: newQuestions[currentQuestionIndex].options.map((opt, idx) =>
            idx === optionIndex ? value : opt
          )
        };
      } else {
        newQuestions[currentQuestionIndex] = {
          ...newQuestions[currentQuestionIndex],
          [field]: value
        };
      }
      return newQuestions;
    });
  };

  const handleDeleteQuestion = (indexToDelete) => {
    
    setQuestions(prev => prev.filter((_, index) => index !== indexToDelete));
    setQuizDetails(prev => ({
      ...prev,
      numberOfQuestions: prev.numberOfQuestions - 1
    }));
  }

  const handleNext = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 1) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setCurrentStep(2);
      }
    }
    else {
      if (idParam.id) {
        console.log('update')
        const updateData = {
          'id': idParam.id,
          ...quizDetails,
          'questions': questions,
        }
        console.log(updateData)
        dispatch(updateQuiz(updateData))
        navigate('/user/quiz-list')
      }
      else {
        console.log("This is the last step");
        const id = uuidv4();
        const data = {
          id,
          ...quizDetails,
          'questions': questions,
        }
        console.log(data)
        dispatch(addQuiz(data))
        navigate('/user/quiz-list')
      }

    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
      setCurrentQuestionIndex(questions.length - 1);
    }
    else if (currentStep === 1) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(prev => prev - 1);
      }
      else {
        setCurrentStep(0);
      }
    }
  };



  return (
    <QuizLayout>
    <QuizStepper activeStep={currentStep} />
    
    <div className="md:mt-7 mt-1 pb-6 border-b border-gray-100 dark:border-gray-800">
      {currentStep === 0 && (
        <QuizDetails
          quizDetails={quizDetails}
          handleQuizDetailsChange={handleQuizDetailsChange}
        />
      )}
      {currentStep === 1 && (
        <QuestionForm
          currentQuestion={questions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          handleQuestionChange={handleQuestionChange}
          onDeleteQuestion={handleDeleteQuestion}
        />
      )}
      {currentStep === 2 && (
        <QuizReview
          quizDetails={quizDetails}
          questions={questions}
        />
      )}
    </div>

    <QuizNavigation
      currentStep={currentStep}
      currentQuestionIndex={currentQuestionIndex}
      questionsLength={questions.length}
      onBack={handleBack}
      onNext={handleNext}
    />
  </QuizLayout>

  );
};

export default QuizCreator;