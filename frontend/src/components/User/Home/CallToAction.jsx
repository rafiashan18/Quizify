import React from 'react';
import { useNavigate } from 'react-router-dom';
import ctaBackground from '../../../assets/images/ctaBackground.png';

const CallToAction = () => {
    const navigate = useNavigate();
    
    const handleStartQuiz = () => {
        navigate("/signup");
    };

    return (
        <div data-aos="slide-up" data-aos-duration="1000" data-aos-once="true"
            className='flex items-center justify-center my-7 lg:my-14 md:my-10 sm:my-4 mx-5'>
            <div className="call-to-action relative min-h-[400px] max-w-7xl w-full bg-gradient-to-r border rounded-2xl overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-cover bg-center" style={{ backgroundImage: `url(${ctaBackground})` }} />
                <div className="max-w-7xl mx-auto px-4 flex md:justify-start justify-center py-16 sm:px-6 lg:px-8">
                    <div className="max-w-lg align-middle">
                        <h4 className="text-3xl md:text-start text-center font-bold text-white mb-8">
                            Test Your Knowledge with Fun Quizzes!
                        </h4>
                        <p className="text-lg md:text-start text-center text-gray-200 mb-10">
                            Explore quizzes in various categories, challenge yourself with different difficulty levels, and see how well you score!
                        </p>
                        <div className='md:text-start text-center'>
                            <button onClick={handleStartQuiz} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                                Start a Quiz Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
