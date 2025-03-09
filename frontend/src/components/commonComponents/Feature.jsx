import React from 'react';

const Feature = ({ title, description, videoSrc, isLeft, number, borderColor }) => {
  const getBorderColorClass = (color) => {
    const colorMap = {
      purple: { border: 'border-purple-800', text: ' text-purple-200', },
      yellow: { border: 'border-yellow-500', text: ' text-yellow-400', },
      blue: { border: 'border-blue-500', text: ' text-blue-300', },
    };
    return colorMap[color] || 'border-purple-800';
  };

  const { border, text } = getBorderColorClass(borderColor)
  return (
    <div className="flex justify-center items-end h-auto overflow-hidden px-4 py-12 o">
      <div className={`max-w-7xl w-full flex flex-col  ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
        <div 
          className="w-full md:w-1/2 p-4 relative md: px-3 overflow-hidden"
          data-aos={isLeft ? "fade-right" : "fade-left"}
          data-aos-duration="1000"
          data-aos-once="true" 
        >
          <span className={` text-6xl md:text-8xl  font-bold  ${text} select-none`}>
            {number}
          </span>
          <div className="relative ">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-gray-500  max-w-xl lg:text-2xl  md:text-lg  ">{description}</p>
          </div>
        </div>
        <div 
          className="w-full md:w-1/2 p-4 overflow-hidden"
          data-aos={isLeft ? "fade-left" : "fade-right"}
          data-aos-duration="1000"
          data-aos-once="true" 
        >
          <div className={`rounded-2xl overflow-hidden border-4 md:border-8 ${border}`}>
            <video
              className="w-full rounded-1xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={videoSrc} type="video/mp4" />
              
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;