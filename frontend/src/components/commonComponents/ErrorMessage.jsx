import React from 'react';

const ErrorMessage = ({ error, onGoBack }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-4">
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{error}</span>
      <button 
        className="mt-3 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded"
        onClick={onGoBack}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorMessage;