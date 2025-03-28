import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlayDetails from '../../../components/UserDashboard/QuizPlaying/PlayDetails'
import { getQuizById } from '../../../services/QuizApi'
import { useDispatch } from 'react-redux'
import { resetQuizState, setQuiz } from '../../../redux/Slices/PlayQuizSlice'
import { AlertCircle, Clock, BookOpen, Award, Users } from 'lucide-react'
import { getUserProgress } from '../../../services/UserProgressApi'
import { isQuizPurchased } from '../../../services/UserApi'


const QuizOverviewScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
 
    const [quiz, setQuizData] = useState(null);
    const [previousQuizResult, setPreviousQuizResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isPremiumQuizPurchased , setIsPremiumQuizPurchased] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const response = await getQuizById(id);
                const data = response.quiz;
                if (data) {
                    console.log(data);
                    setQuizData(data);
                    dispatch(resetQuizState());
                    const formattedQuizData = {
                        quizId: data._id || null,
                        title: data.title || "",
                        category: data.category || "",
                        difficulty: data.difficulty || "",
                        description: data.description || "",
                        duration: data.duration || "",
                        coverImage: data.coverImage || "",
                        popularity: data.popularity || "",
                        isPremium:data.isPremium || false,
                        questionCount: data.questions ? data.questions.length : 0,
                        questions: data.questions.map(q => ({
                            questionId: q._id || null,
                            questionText: q.questionText || "",
                            imageUrl: q.imageUrl || "",
                            options: q.options || [],
                            correctOption: q.correctOption || ""
                        })),
                        attempts: 0,
                        currentQuestionIndex: 0,
                        selectedOptions: new Array(data.questions ? data.questions.length : 0).fill(null),
                        isAnswersCorrect: new Array(data.questions ? data.questions.length : 0).fill(null),
                        score: 0
                    };
                 
                    console.log(formattedQuizData);
                    dispatch(setQuiz(formattedQuizData));
                   
                } else {
                    setQuizData(null);
                }
                               
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setQuizData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id, dispatch]);

    useEffect(() => {
        if (quiz && quiz.isPremium) {
            const checkPurchaseStatus = async () => {
                try {
                    const response = await isQuizPurchased(quiz._id);
                    console.log("Purchase status:", response);
                    setIsPremiumQuizPurchased(response?.isPurchased || false);
                } catch (error) {
                    console.error("Error checking purchase status:", error);
                }
            };
    
            checkPurchaseStatus();
        }
    }, [quiz]);
    

    useEffect(() => {
      

      const fetchUserProgress = async() => {
        const progressData=await getUserProgress(quiz._id);
        console.log(progressData)
        setPreviousQuizResult(progressData)
      }
      fetchUserProgress()
    }, [quiz])
    
    const PlayQuiz = () => {
        if (quiz && quiz.questions && quiz.questions.length > 0 ) {
            navigate(`/user/play-start/${id}`);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    console.log(previousQuizResult?.score)
    return (
        <div className='p-3'>
            <div className='w-full md:min-h-[520px] h-full bg-white dark:bg-gray-900  rounded-xl overflow-hidden transition-all duration-300'>
                {loading ? (
                    <div className='p-6 border h-full flex justify-center items-center'>
                        <div className='text-center'>
                            <p className='text-lg'>Loading quiz details...</p>
                        </div>
                    </div>
                ) : quiz ? (
                    <div className='p-3 space-y-6 m-5'>
                        <PlayDetails title={quiz.title} category={quiz.category} description={quiz.description} image={quiz.coverImage} />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                            <div className='flex items-center space-x-2 p-3 bg-purple-50 dark:bg-gray-800 rounded-lg'>
                                <Clock className='w-5 h-5 text-purple-600' />
                                <span className='text-gray-700 dark:text-gray-200'>Attempt: {previousQuizResult?.attempts || 'Not specified'}</span>
                            </div>
                            <div className='flex items-center space-x-2 p-3 bg-purple-50 dark:bg-gray-800 rounded-lg'>
                                <BookOpen className='w-5 h-5 text-purple-600' />
                                <span className='text-gray-700 dark:text-gray-200'>Questions: {quiz.questions?.length || 0}</span>
                            </div>
                            <div className='flex items-center space-x-2 p-3 bg-purple-50 dark:bg-gray-800 rounded-lg'>
                                <Award className='w-5 h-5 text-purple-600' />
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                                    {quiz.difficulty || 'Not specified'}
                                </span>
                            </div>
                            <div className='flex items-center space-x-2 p-3 bg-purple-50 dark:bg-gray-800 rounded-lg'>
                                <Users className='w-5 h-5 text-purple-600' />
                                <span className='text-gray-700 dark:text-gray-200'>Prevous Score: {previousQuizResult?.score??  'New'}</span>
                            </div>
                        </div>

                        {/* Start Button with ternary conditonal */}
                        <div>

                            {quiz.questions && quiz.questions.length > 0 ? (
                             <button
                             className='p-3 border border-purple-400 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50'
                             onClick={() => {
                                 if (quiz.isPremium && !isPremiumQuizPurchased) {
                                     navigate(`/user/purchase-quiz/${quiz._id}/${quiz.amount}`); 
                                 } else {
                                     PlayQuiz();
                                 }
                             }}
                         >
                             {quiz.isPremium ? (isPremiumQuizPurchased ? "Start Now" : "Buy Now") : "Start Now"}
                         </button>
                         
                            ) : (
                                <div className='p-4 border border-orange-200 bg-orange-50 text-orange-800 rounded-md flex items-center space-x-2'>
                                    <AlertCircle className='w-5 h-5' />
                                    <span>This quiz has no questions yet. Please try another quiz.</span>
                                </div>
                            )}
                        </div>

                        {/* Back to Quizzes Link */}
                        <div className='mt-4'>
                            <Link
                                to='/user/available-quizes'
                                className='text-purple-600 hover:text-purple-800 font-medium'
                            >
                                &larr; Back to all quizzes
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className='p-6 border h-full flex justify-center items-center'>
                        <div className='text-center'>
                            <h4 className='text-lg'>Quiz Details Not Found</h4>
                            <Link to='/user/available-quizes' className='text-purple-400 font-semibold'>Explore More Quizzes</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizOverviewScreen;