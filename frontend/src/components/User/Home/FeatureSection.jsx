import React from 'react'
import Feature from "../../Common/Feature"
import Feature1 from "../../../assets/videos/feature1.mp4"
import Feature2 from "../../../assets/videos/feature2.mp4"
import Feature3 from "../../../assets/videos/feature3.mp4"
const FeatureSection = () => {
    return (
        <>
        
          <Feature
            number="01"
            title="Play Quizzes"
            description=" Enjoy an interactive quiz experience with real-time feedback and a dynamic interface that keeps users engaged."
            videoSrc={Feature2}
            isLeft={true}
             borderColor="purple"
        />
        <Feature
            number="02"
            title="Unlock Premium Quizzes"
            description="Access exclusive, high-quality quizzes with deeper insights, challenging questions, and bonus rewards by upgrading to premium"
            videoSrc={Feature1}
            isLeft={false}
            borderColor="blue"
        />
          <Feature
            number="03"
            title="Instant Feedback & Scoring"
            description="Receive real-time feedback on your answers as you play! Correct answers are highlighted instantly, and your score updates dynamically."
            videoSrc={Feature3}
            isLeft={true}
            borderColor="yellow"
        />
        </>
    )
}

export default FeatureSection