import React from 'react'
import Features from '../../components/User/FeaturespageComponent/features'
import CTA from '../../components/Common/CTA'
import HeroSection from '../../components/Common/HeroSection'

const FeaturesScreen = () => {
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

export default FeaturesScreen