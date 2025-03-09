import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import QuizLayout from './QuizLayout';
import QuizNavigation from './QuizNavigation';
import QuizStepper from './QuizStepper';
import CreateQuizDetails from './CreateQuizDetails';
import CreateQuestionForm from './CreateQuestionForm';
import QuizReview from './QuizReview';
import { updateQuizDetails } from '../../../redux/Slices/QuizSlice';
import { addQuiz } from '../../../services/QuizApi';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isSubmitting , setIsSubmiting] = useState(false)
    const [quizDetails, setQuizDetails] = useState({
        title: "",
        description: "",
        category: "",
        difficulty: "",
        coverImage: null,
    });
    
    const [questions, setQuestions] = useState([]);

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleNext = async () => {
        if (currentStep === 2) {
            const formData = new FormData();
            setIsSubmiting(true);

            formData.append("title", quizDetails.title);
            formData.append("description", quizDetails.description);
            formData.append("category", quizDetails.category);
            formData.append("difficulty", quizDetails.difficulty);
        
            if (quizDetails.coverImage) {
                formData.append("coverImage", quizDetails.coverImage);
            }
        
            
            questions.forEach((question, index) => {
                formData.append(`questions[${index}][questionText]`, question.questionText);
                formData.append(`questions[${index}][correctOption]`, question.correctOption);
        
                question.options.forEach((option, optionIndex) => {
                    formData.append(`questions[${index}][options][${optionIndex}]`, option);
                });
        
                if (question.imageFile) {
                    formData.append("ImageUrl", question.imageFile); // Matches backend field
                }
            });
        
            try {
                const response = await addQuiz(formData);
                console.log(response);
                dispatch(updateQuizDetails({ ...quizDetails, questions }));
                navigate('/admin/display-quizes');
            } catch (error) {
                console.error("Quiz submission failed:", error);
            }
            finally{
                setIsSubmiting(false);
            }

            return;

        }
        

        setCurrentStep(prev => prev + 1);
    };

    const steps = [
        <CreateQuizDetails 
            quizDetails={quizDetails} 
            setQuizDetails={setQuizDetails} 
        />,

        <CreateQuestionForm 
            onNext={handleNext} 
            questions={questions} 
            setQuestions={setQuestions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
        />,
        
        <QuizReview 
            quizDetails={quizDetails} 
            questions={questions} 
        />
    ];

    return (
        <div>
            <QuizLayout>
                <QuizStepper activeStep={currentStep} />
                <div className="border-b border-gray-100 dark:border-gray-800">
                    {steps[currentStep]}
                </div>
                <QuizNavigation
                    currentStep={currentStep}
                    currentQuestionIndex={currentQuestionIndex}
                    questionsLength={questions.length}
                    onBack={handleBack}
                    onNext={handleNext}
                    quizDetails={quizDetails}
                    questions={questions}
                    isSubmitting={isSubmitting}
                />
            </QuizLayout>
        </div>
    );
};

export default CreateQuiz;