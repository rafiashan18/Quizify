import React from 'react'

const PlayDetails = ({ title, category, description, image }) => {
  return (
   <div className=''>
     <div className='w-full  space-y-4'>
      {image && (
        <div className='md:h-52 h-min overflow-hidden'>
          <img 
            src={image} 
            alt={title} 
            className='w-full h-full object-cover  hover:scale-110 transition-transform duration-300'
          />
        </div>
      )}
      <div className=' space-y-3'>
        <h1 className='text-3xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
          {title}
        </h1>
        <h5 className='text-sm uppercase tracking-wide text-gray-500 font-semibold'>
          {category}
        </h5>
        <p className='text-gray-600 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
   </div>
  )
}

export default PlayDetails