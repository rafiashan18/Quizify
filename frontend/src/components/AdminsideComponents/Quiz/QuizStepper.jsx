import { Stepper } from 'react-form-stepper';

const QuizStepper = ({ activeStep }) => (
    <div className="md:mb-12 mb-2">
      <Stepper
        steps={[
          { label: 'Quiz Details' },
          { label: 'Add Questions' },
          { label: 'Review & Submit' },
        ]}
        activeStep={activeStep}
      />
    </div>
  );

  export  default QuizStepper;