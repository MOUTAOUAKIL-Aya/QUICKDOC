import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressSteps = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'Zones du Corps', icon: 'User', description: 'Localisation' },
    { number: 2, label: 'Symptômes', icon: 'Stethoscope', description: 'Identification' },
    { number: 3, label: 'Détails', icon: 'ClipboardList', description: 'Précision' },
    { number: 4, label: 'Résultats', icon: 'Search', description: 'Analyse' }
  ];

  return (
    <div className="w-full space-y-4">
      {/* Barre de progression simple */}
      <div className="relative">
        {/* Ligne de fond */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2 z-0" />
        
        {/* Ligne de progression */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-primary transform -translate-y-1/2 transition-all duration-500 ease-out z-10"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
        
        {/* Points d'étape */}
        <div className="relative flex justify-between z-20">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;
            
            return (
              <div key={step.number} className="flex flex-col items-center">
                {/* Cercle */}
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  border-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-success border-success text-white' 
                    : isCurrent 
                    ? 'bg-primary border-primary text-white scale-110 shadow-lg' 
                    : 'bg-white border-border text-muted-foreground'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={18} />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </div>
                
                {/* Étiquettes */}
                <div className="mt-2 text-center">
                  <p className={`text-xs font-semibold ${
                    isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicateur de progression */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Étape {currentStep} sur {totalSteps}
            </h3>
            <p className="text-xs text-gray-600 mt-1">
              {currentStep === 1 && "Sélectionnez les zones du corps où vous ressentez des symptômes"}
              {currentStep === 2 && "Choisissez tous les symptômes qui s'appliquent"}
              {currentStep === 3 && "Indiquez l'intensité et la durée des symptômes"}
              {currentStep === 4 && "Analyse en cours des informations fournies"}
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">
              {Math.round((currentStep / totalSteps) * 100)}%
            </div>
            <div className="text-xs text-gray-500">complété</div>
          </div>
        </div>
        
        {/* Barre de progression secondaire */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progression</span>
            <span>{currentStep}/{totalSteps} étapes</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSteps;