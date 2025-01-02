import React from 'react'
import HeroSection from '../components/commonComponents/HeroSection'
import ContactForm from '../components/HomepageComponents/ContactpageComponent/ContactForm'
import GoogleMap from '../components/HomepageComponents/ContactpageComponent/GoogleMap'

const ContactUs = () => {
  return (
   <>
    <HeroSection
    title="Contact Us"
   description="To empower learners of all ages by providing an interactive platform that makes knowledge sharing enjoyable and accessible."
    />
    <ContactForm/>
    <GoogleMap/>
   </>
  )
}

export default ContactUs