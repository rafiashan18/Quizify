import React from 'react'

import Testimonial from '../../commonComponents/testimonial'

import review1 from '../../../assets/images/review1.jpg'
import review4 from '../../../assets/images/review4.jpg'
import review3 from '../../../assets/images/review3.jpg'

const TestimonialSection = () => {
    return (
        <>
            <section className="text-gray-600 flex items-center justify-center body-font  ">
                <div className="container px-5  mx-auto   my-7 lg:my-14 md:my-10 sm:my-4 ">
                    <div className="flex flex-wrap -m-4">

                        <Testimonial
                            title="Jhonnyy"
                            description="I absolutely love this quiz app! The ability to create and share quizzes with friends is fantastic. The interface is user-friendly, and I appreciate the scoreboard feature that keeps track of my scores. Highly recommend for quiz lovers!"
                            imageSrc={review1}
                            borderColor="purple"
                        />
                        <Testimonial
                            title="Jhonnyy"
                            description="This quiz application is a game changer! I enjoy creating quizzes and challenging my friends. The API for generating random quizzes is a great addition, making it easy to keep things fresh. The only downside is that some quizzes require payment, but the quality is worth it!"
                            imageSrc={review4}
                            borderColor="purple"
                        />
                        <Testimonial
                            title="Jhonnyy"
                            description="I think this quiz app has a lot of potential, but it needs some improvements. The quiz creation process is straightforward, and I love the variety of topics available. However, I found some of the pro quizzes to be overpriced for what they offer. Overall, it's a fun app, but there's room for growth"
                            imageSrc={review3}
                            borderColor="purple"
                        />

                    </div>
                </div>
            </section>
        </>
    )
}

export default TestimonialSection