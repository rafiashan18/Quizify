import React from 'react'
import Feature from '../commonComponents/Feature'
import Feature1 from '../../assets/videos/feature1.mp4'
import Feature2 from '../../assets/videos/feature2.mp4'
import Feature3 from '../../assets/videos/feature3.mp4'
const FeatureSection = () => {
    return (
        <>
        <Feature
            number="01"
            title="Create Custom Quizzes"
            description=" Users can easily design custom quizzes with an intuitive interface that supports multimedia and flexible question formats."
            videoSrc={Feature1}
            isLeft={true}
            borderColor="purple"
        />
          <Feature
            number="02"
            title="Play Quizzes"
            description=" Enjoy an interactive quiz experience with real-time feedback and a dynamic interface that keeps users engaged."
            videoSrc={Feature2}
            isLeft={false}
             borderColor="blue"
        />
          <Feature
            number="03"
            title="Scoreboard & Leadership"
            description="The scoreboard feature highlights real-time rankings, allowing users to track their performance and compete with others."
            videoSrc={Feature3}
            isLeft={true}
            borderColor="yellow"
        />
        </>
    )
}

export default FeatureSection