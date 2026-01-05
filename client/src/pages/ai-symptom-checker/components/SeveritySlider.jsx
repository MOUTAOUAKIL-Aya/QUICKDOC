import React from 'react';
import Icon from '../../../components/AppIcon';

const SeveritySlider = ({ severity, onSeverityChange }) => {
  const severityLevels = [
    { value: 1, label: 'Mild', color: 'text-success', bgColor: 'bg-success/10', icon: 'Smile' },
    { value: 2, label: 'Moderate', color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Meh' },
    { value: 3, label: 'Severe', color: 'text-error', bgColor: 'bg-error/10', icon: 'Frown' }
  ];

  const currentLevel = severityLevels?.find(level => level?.value === severity) || severityLevels?.[0];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Symptom Severity</label>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${currentLevel?.bgColor}`}>
          <Icon name={currentLevel?.icon} size={16} className={currentLevel?.color} />
          <span className={`text-sm font-semibold ${currentLevel?.color}`}>{currentLevel?.label}</span>
        </div>
      </div>
      <div className="relative pt-6 pb-2">
        <input
          type="range"
          min="1"
          max="3"
          step="1"
          value={severity}
          onChange={(e) => onSeverityChange(parseInt(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, var(--color-success) 0%, var(--color-warning) 50%, var(--color-error) 100%)`
          }}
        />
        
        <div className="flex justify-between mt-2">
          {severityLevels?.map((level) => (
            <button
              key={level?.value}
              onClick={() => onSeverityChange(level?.value)}
              className={`flex flex-col items-center gap-1 transition-opacity ${
                severity === level?.value ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${level?.bgColor} flex items-center justify-center`}>
                <Icon name={level?.icon} size={16} className={level?.color} />
              </div>
              <span className="text-xs text-muted-foreground">{level?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-muted/50 rounded-lg p-3 border border-border">
        <p className="text-xs text-muted-foreground">
          {severity === 1 && "Mild symptoms are manageable and don't significantly interfere with daily activities."}
          {severity === 2 && "Moderate symptoms cause noticeable discomfort and may affect daily routines."}
          {severity === 3 && "Severe symptoms significantly impact daily life and may require immediate medical attention."}
        </p>
      </div>
    </div>
  );
};

export default SeveritySlider;