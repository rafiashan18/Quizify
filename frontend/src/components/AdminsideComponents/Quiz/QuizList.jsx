import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import { removeQuiz } from '../../../redux/Slices/QuizSlice';

const QuizList = () => {

    const dispatch = useDispatch();
    // const idParam = useParams();

    const quizzes = useSelector((state) => state.quiz.quizzes);
    useEffect(
        () => {
            console.log(quizzes)
        }, [quizzes]
    )


    const handleDeleteQuiz = (quizId) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            dispatch(removeQuiz(quizId));
        }
    };


    return (
        <div className="mx-auto md:p-4 p-2 min-h-screen bg-transparent dark:bg-gray-900 transition-colors duration-200">
            <div className="flex flex-col gap-5 md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Quizzes</h1>
                <Link
                    to="/user/quiz-form"
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 
        sm:px-3 sm:py-3 sm:text-lg lg:px-8 lg:py-4 lg:text-xl"
                >
                    <PlusCircle className="w-4 h-4 mr-2 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    Create Quiz
                </Link>

            </div>

            {quizzes.length === 0 ? (
                <div className="text-center py-12   bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                        No Quizzes Available
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                        Start by creating your first quiz!
                    </p>
                    <Link
                        to="/user/quiz-form"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Create Quiz
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 ">
                    {quizzes.map((quiz) => {

                        return (
                            <div
                                key={quiz.id}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700 p-6 hover:shadow-lg transition-all duration-200"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {quiz.title}
                                </h3>

                                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                    <span className="dark:text-white">Category: </span>
                                    <span className="text-gray-900 dark:text-gray-400">{quiz.category}</span>
                                </div>

                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    <p>
                                        <span className="dark:text-white">Questions: </span>
                                        {quiz.numberOfQuestions}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/user/quiz-form/${quiz.id}`}
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                                        text-gray-700 dark:text-gray-300 rounded-md 
                                        hover:bg-gray-50 dark:hover:bg-gray-700 
                                        flex items-center justify-center transition-colors duration-200"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit
                                    </Link>
                                    <button
                                        className="flex-1 px-4 py-2 border border-red-300 dark:border-red-500 
                                        text-red-600 dark:text-red-400 rounded-md 
                                        hover:bg-red-50 dark:hover:bg-red-900/20 
                                        flex items-center justify-center transition-colors duration-200"
                                        onClick={() => handleDeleteQuiz(quiz.id)}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </button>
                                </div>
                            </div>

                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default QuizList;