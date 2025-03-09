import React from 'react';
import {
    Trophy,
    XCircle,
    CheckCircle,
    Clock,
    CalendarDays,
    PlayCircle,
    Link
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizHistoryCard = ({ quizHistory }) => {
    console.log(quizHistory)
    const navigate = useNavigate()
    // Calculate statistics
    const totalQuestions = quizHistory.questions.length;
    const correctAnswers = quizHistory.questions.filter(
        (q) => q.selectedAnswer === q.correctAnswer
    ).length;
    const wrongAnswers = totalQuestions - correctAnswers;
    const scorePercentage = (correctAnswers / totalQuestions) * 100;

    // Format date
    const formattedDate = new Date(quizHistory.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className="bg-white flex flex-col justify-between rounded-xl shadow-lg p-6   hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4  items-start justify-between mb-4">
                <h3 className="text-lg font-bold max-w-[400px] text-purple-700 ">
                    {quizHistory.quizTitle}
                </h3>
                <div className="flex items-center gap-2 text-purple-600">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <span className="font-bold">{scorePercentage.toFixed(0)}%</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center  gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 ">
                        {correctAnswers} Correct
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600">
                        {wrongAnswers} Wrong
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">
                        {totalQuestions} Questions
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <button
            onClick={()=>navigate(`/user/play-start/${quizHistory.quizId}`)}
                
                className="w-full bg-purple-600 hover:bg-purple-700 hover:cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
                <PlayCircle className="w-5 h-5" />
                Play Again
            </button>
        </div>
    );
};

export default QuizHistoryCard;