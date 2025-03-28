// // Quiz.jsx
// import React from 'react';

// const QuizDetailsDisplay = ({ quiz }) => {
//   const difficultyColors = {
//     easy: 'bg-green-100 text-green-800',
//     medium: 'bg-yellow-100 text-yellow-800',
//     hard: 'bg-red-100 text-red-800'
//   };

//   return (
//     <>
//       <div className="flex justify-between items-start mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[quiz.difficulty] || 'bg-gray-100'}`}>
//           {quiz.difficulty ? quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1) : 'UNSPECIFIED'}
//         </span>
//       </div>
      
//       <div className="mb-4">
//         <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mr-2">
//           {quiz.category || 'Uncategorized'}
//         </span>
//         <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
//           {quiz.questions?.length || 0} questions
//         </span>
//       </div>
      
//       {/* <div className="text-gray-600 mb-4">
//         <h3 className="text-sm font-medium text-gray-500 mb-1">Description:</h3>
//         <p>{quiz.description}</p>
//       </div> */}
     
//     </>
//   );
// };

// export default QuizDetailsDisplay;