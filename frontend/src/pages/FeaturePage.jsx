import React from 'react'
import Features from '../components/HomepageComponents/FeaturespageComponent/features'
import CTA from '../components/commonComponents/CTA'
import HeroSection from '../components/commonComponents/HeroSection'

const FeaturePage = () => {
  return (
    <div>
      <HeroSection
        title="Features"
        description="To empower learners of all ages by providing an interactive platform that makes knowledge sharing enjoyable and accessible."
      />
      <Features

      />
      <CTA />
    </div>
  )
}

export default FeaturePage