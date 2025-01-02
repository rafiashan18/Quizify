import React from 'react'
import HeroSection from '../components/commonComponents/HeroSection'
import CoreValues from '../components/HomepageComponents/AboutpageComponents/CoreValues'
import CTA from '../components/commonComponents/CTA'
import ImageGallery from '../components/HomepageComponents/AboutpageComponents/ImageGallary'

const AboutUs = () => {
  return (
   <>
   <HeroSection
   title="About Us"
   description="To empower learners of all ages by providing an interactive platform that makes knowledge sharing enjoyable and accessible."
   />
   <ImageGallery/>
   <CoreValues
   
   />
   <CTA/>
   </>
  )
}

export default AboutUs