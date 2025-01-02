import React from 'react';
import backgroundImage from '../../assets/images/background.jpg'


const HeroSection = ({title , description}) => {
    return (
        <div className="relative ">
            <div
                className="hero-wrapper relative h-96 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${backgroundImage})`
                }}
            >
                <div className="absolute inset-0 bg-black/5" /> {/* Overlay */}
                <div className="hero-text-wrapper  -top-6  flex justify-center  relative z-10 container mx-auto px-4 h-full  items-center">
                    <div className="max-w-2xl  text-center text-white">
                        <h1 className=" text-3xl font-bold py-4 ">
                            {title}
                        </h1>
                        <p className='max-w-xl'>{description}</p>
                    </div>
                </div>
                {/* <div className="custom-shape-divider-bottom-1735738523">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" className="shape-fill"></path>
                    </svg>
                </div> */}
            </div>
         
        </div>
    );
};

export default HeroSection;