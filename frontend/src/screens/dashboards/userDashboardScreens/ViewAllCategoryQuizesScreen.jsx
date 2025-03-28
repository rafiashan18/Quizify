// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { AllQuizzesByCategoryAndType } from '../../../services/QuizRetrievalApi'
// import QuizCard from '../../../components/Common/QuizCard'
// import { ChevronLeft, Loader2 } from 'lucide-react'

// const ViewAllCategoryQuizesScreen = () => {
//   const { category, type } = useParams()
//   const [quizzes, setQuizzes] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         setLoading(true)
//         const allQuizzes = await AllQuizzesByCategoryAndType(category, type)
//         console.log(allQuizzes)
//         setQuizzes(allQuizzes)
//       } catch (error) {
//         console.error("Failed to fetch quizzes:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchQuizzes()
//   }, [category, type])



//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

//         <div 
//           className="flex items-center mb-6 text-purple-800 hover:text-purple-600 transition-colors cursor-pointer" 
//           onClick={() => navigate(-1)}
//         >
//           <ChevronLeft className="h-5 w-5 mr-1" />
//           <span className="font-medium">
//             {category} / {type}
//           </span>
//         </div>

      
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">
//          <span style={{ textTransform: 'capitalize' }}>{type}</span>   Quizzes in {category}
//         </h1>


//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
//             <span className="ml-3 text-lg text-gray-600">Loading quizzes...</span>
//           </div>
//         ) : !quizzes || quizzes.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <h3 className="text-xl font-medium text-gray-900 mb-2">No Quizzes Available</h3>
//             <p className="text-gray-600">There are currently no quizzes in this category.</p>
//           </div>
//         ) : (
//           <>
          
//             <p className="text-gray-600 mb-4">
//               Showing {filteredQuizzes?.length || 0} quizzes
//             </p>

        
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filteredQuizzes?.map((quiz, index) => (
//                 <div 
//                   key={index} 
//                   className="transform transition duration-200 hover:scale-105"
//                 >
//                   <QuizCard
//                     title={quiz.title}
//                     category={quiz.category}
//                     difficulty={quiz.difficulty}
//                     description={quiz.description}
//                     coverImage={quiz.coverImage}
//                     totalQuestions={quiz.totalQuestions}
//                   />
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ViewAllCategoryQuizesScreen



import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AllQuizzesByCategoryAndType } from '../../../services/QuizRetrievalApi'
import QuizCard from '../../../components/Common/QuizCard'
import { ChevronLeft, Loader2 } from 'lucide-react'

const ViewAllCategoryQuizesScreen = () => {
  const { category, type } = useParams()
  const [quizzes, setQuizzes] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true)
        const allQuizzes = await AllQuizzesByCategoryAndType(category, type)
        console.log(allQuizzes)
        setQuizzes(allQuizzes)
      } catch (error) {
        console.error("Failed to fetch quizzes:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [category, type])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div 
          className="flex items-center mb-6 text-purple-800 hover:text-purple-600 transition-colors cursor-pointer" 
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          <span className="font-medium">
            {category} / {type}
          </span>
        </div>
      
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          <span style={{ textTransform: 'capitalize' }}>{type}</span> Quizzes in {category}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-purple-600 animate-spin" />
            <span className="ml-3 text-lg text-gray-600">Loading quizzes...</span>
          </div>
        ) : !quizzes || quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Quizzes Available</h3>
            <p className="text-gray-600">There are currently no quizzes in this category.</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              Showing {quizzes?.length || 0} quizzes
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {quizzes?.map((quiz, index) => (
                <div 
                  key={index} 
                  className="transform transition duration-200 hover:scale-105"
                  onClick={()=> navigate(`/user/play-quiz/${quiz._id}`)}
                >
                  <QuizCard
                    title={quiz.title}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    description={quiz.description}
                    coverImage={quiz.coverImage}
                    totalQuestions={quiz.totalQuestions}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ViewAllCategoryQuizesScreen