import React from 'react';

const FloatingActionButtons = ({ handleEditToggle, handleSaveChanges, savingChanges }) => {
  return (
    <div className="fixed bottom-6 right-6 flex space-x-3">
      <button 
        onClick={handleEditToggle}
        className="bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-full shadow-lg"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <button 
        onClick={handleSaveChanges}
        disabled={savingChanges}
        className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-lg disabled:opacity-50"
      >
        {savingChanges ? (
          <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default FloatingActionButtons;