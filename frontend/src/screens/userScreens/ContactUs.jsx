import React from 'react'
import HeroSection from '../../components/Common/HeroSection'
import ContactForm from '../../components/User/ContactpageComponent/ContactForm'
import GoogleMap from '../../components/User/ContactpageComponent/GoogleMap'

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