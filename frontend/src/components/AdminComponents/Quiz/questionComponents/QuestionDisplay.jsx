import React from 'react';
import QuizImageDisplay from '../QuizImageDisplay';

const QuestionDisplay = ({ question }) => {
  return (
    <>
      <div className="mb-4">
        {question.questionText && (
          <h4 className="text-lg font-medium text-gray-800 mb-2">{question.questionText}</h4>
        )}
        
        {question.imageUrl && (
          <div className="mb-4 w-full max-w-lg mx-auto">
            <QuizImageDisplay
              imageUrl={question.imageUrl} 
              altText={question.title}
            />
          </div>
        )}
        
        {question.buffer && question.buffer.data && (
          <div className="mb-4">
            <h5 className="text-sm font-medium text-gray-700 mb-1">This question has image data</h5>
          </div>
        )}
        
        {question.options && question.options.length > 0 ? (
          <>
            <h5 className="text-sm font-medium text-gray-700 mb-2">Options:</h5>
            <ul className="space-y-2">
              {question.options.map((option, oIndex) => (
                <li 
                  key={oIndex}
                  className={`px-4 py-2 rounded-lg ${question.correctOption === oIndex.toString() 
                    ? 'bg-green-100 border border-green-300' 
                    : 'bg-gray-50 border border-gray-200'}`}
                >
                  <div className="flex items-start">
                    <span className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-xs mr-3">
                      {oIndex + 1}
                    </span>
                    <span>{option}</span>
                    {question.correctOption === oIndex.toString() && (
                      <span className="ml-auto text-green-600 font-medium text-sm">
                        Correct Answer
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
            <p className="text-yellow-800">No options defined for this question.</p>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500">
        Question ID: <span className="font-mono">{question._id}</span>
      </div>
    </>
  );
};

export default QuestionDisplay;