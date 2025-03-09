import React from 'react';
import { Stepper } from 'react-form-stepper';

const QuizStepper = ({ activeStep }) => (
  <div className="mb-4">
    <Stepper
      steps={[
        { label: 'Quiz Details' },
        { label: 'Add Questions' },
        { label: 'Review & Submit' },
      ]}
      activeStep={activeStep}
      connectorStateColors={true}
      connectorStyleConfig={{
        completedColor: '#8b5cf6', // purple-500
        activeColor: '#3b82f6',    // blue-500
        disabledColor: '#d1d5db',  // gray-300
      }}
      styleConfig={{
        activeBgColor: '#3b82f6',  // blue-500
        activeTextColor: '#ffffff', // white
        completedBgColor: '#8b5cf6', // purple-500 
        completedTextColor: '#ffffff', // white
        inactiveBgColor: '#fef3c7', // yellow-100 (light yellow background)
        inactiveTextColor: '#92400e', // yellow-800 (darker yellow text for contrast)
        size: '2em',
        circleFontSize: '1rem',
        labelFontSize: '0.875rem',
        borderRadius: '50%',
        fontWeight: 500,
      }}
    />
  </div>
);

export default QuizStepper;