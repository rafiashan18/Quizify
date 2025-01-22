import React from 'react';
import ctaBackground from '../../../assets/images/ctaBackground.png'
const CallToAction = () => {
    return (
        <div 
        data-aos="zoom-out"
        data-aos-duration="1000"
        data-aos-once="true"
        className='flex items-center justify-center my-7 lg:my-14 md:my-10 sm:my-4 mx-5  '>
            <div className="relative min-h-[400px] max-w-7xl w-full bg-gradient-to-r border   rounded-2xl   overflow-hidden">

                <div
                    className="absolute inset-0 -z-10 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${ctaBackground})`
                    }}
                />


                <div className="max-w-7xl mx-auto px-4      py-16 sm:px-6 lg:px-8">
                    <div className="max-w-lg align-middle">

                        <h4 className="text-3xl font-bold text-white mb-8">
                            See How You Rank on the Leaderboard!
                        </h4>
                        <p className="text-lg text-gray-200 mb-10">
                            Compete with friends and challenge yourself to climb to the top
                        </p>


                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                            View Leaderboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;