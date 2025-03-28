import React from 'react'
import HeroSection from '../../components/Common/HeroSection'
import CoreValues from '../../components/User/AboutpageComponents/CoreValues'
import CTA from '../../components/Common/CTA'
import ImageGallery from '../../components/User/AboutpageComponents/ImageGallary'

const AboutUs = () => {
  return (
    <>
      <HeroSection
        title="About Us"
        description="To empower learners of all ages by providing an interactive platform that makes knowledge sharing enjoyable and accessible."
      />
      <ImageGallery />
      <CoreValues

      />
      <CTA />
    </>
  )
}

export default AboutUs