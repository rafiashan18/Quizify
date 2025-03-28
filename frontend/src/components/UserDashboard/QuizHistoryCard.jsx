import React from 'react';
import {
    Trophy,
    XCircle,
    CheckCircle,
    Clock,
    CalendarDays,
    PlayCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizHistoryCard = ({ quizProgress }) => {
    const navigate = useNavigate();
    // console.log(quizProgress)
    const totalQuestions = quizProgress.totalQuestions;
    const correctAnswers = quizProgress.correctAnswers;
    const wrongAnswers = totalQuestions - correctAnswers;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    const formattedDate = new Date(quizProgress.attemptedAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });


    const quizTitle = quizProgress.quizTitle || `Quiz #${quizProgress.quizId.toString().slice(-6)}`;

    return (
        <div className="bg-white flex flex-col justify-between rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex flex-col  md:flex-row gap-4 items-start justify-between mb-4">
                <h3 className="lg:text-lg mg:text-base font-bold max-w-[400px] text-purple-700">
                    {quizTitle}
                </h3>
                <div className="flex items-center gap-2 text-purple-600">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">{scorePercentage.toFixed(0)}%</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 whitespace-nowrap" />
                    <span className="text-gray-600  whitespace-nowrap">
                        {correctAnswers} Correct
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500 whitespace-nowrap" />
                    <span className="text-gray-600   whitespace-nowrap ">
                        {wrongAnswers} Wrong
                    </span>
                </div>
                <div className="flex items-center  ">
                    <Clock className="w-5 h-5 text-purple-500 " />
                    <span className="text-gray-600 ms-2 whitespace-nowrap">
                        {totalQuestions} Questions
                    </span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                    <CalendarDays className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={() => navigate(`/user/play-quiz/${quizProgress.quizId}`)}
                className="w-full bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
                <PlayCircle className="w-5 h-5" />
                Play Again
            </button>
        </div>
    );
};

export default QuizHistoryCard;