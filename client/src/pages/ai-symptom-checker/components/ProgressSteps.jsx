import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Body Areas', icon: 'User' },
    { number: 2, label: 'Symptoms', icon: 'Stethoscope' },
    { number: 3, label: 'Details', icon: 'ClipboardList' },
    { number: 4, label: 'Analysis', icon: 'Brain' }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step?.number < currentStep
                    ? 'bg-success text-success-foreground'
                    : step?.number === currentStep
                    ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                    : 'bg-muted text-muted-foreground'
                } border-2 ${
                  step?.number <= currentStep ? 'border-primary' : 'border-border'
                }`}
              >
                {step?.number < currentStep ? (
                  <Icon name="Check" size={18} />
                ) : (
                  <Icon name={step?.icon} size={18} />
                )}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step?.label}
              </span>
            </div>
            {index < steps?.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 relative">
                <div className="absolute inset-0 bg-border" />
                <div
                  className={`absolute inset-0 bg-primary transition-all duration-500 ${
                    step?.number < currentStep ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressSteps;