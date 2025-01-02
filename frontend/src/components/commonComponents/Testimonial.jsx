import React from 'react'

const Testimonial = ({ title, description, imageSrc, borderColor }) => {
  return (
    <>
      <div className="lg:w-1/3 lg:mb-0 p-4">
        <div className="h-full text-center">
          <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={`${imageSrc}`} />
          <p className="leading-relaxed">{description}</p>
          <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">{title}</h2>
          
        </div>
      </div>
    </>
  )
}

export default Testimonial