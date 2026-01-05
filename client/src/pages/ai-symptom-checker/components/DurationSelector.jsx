import React from 'react';
import Icon from '../../../components/AppIcon';

const DurationSelector = ({ duration, onDurationChange }) => {
  const durationOptions = [
    { value: 'hours', label: 'Few Hours', icon: 'Clock', description: 'Started today' },
    { value: 'days', label: '1-3 Days', icon: 'Calendar', description: 'Recent onset' },
    { value: 'week', label: '4-7 Days', icon: 'CalendarDays', description: 'About a week' },
    { value: 'weeks', label: '1-2 Weeks', icon: 'CalendarRange', description: 'Ongoing issue' },
    { value: 'month', label: 'Over a Month', icon: 'CalendarClock', description: 'Chronic condition' }
  ];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">How long have you had these symptoms?</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {durationOptions?.map((option) => {
          const isSelected = duration === option?.value;
          
          return (
            <button
              key={option?.value}
              onClick={() => onDurationChange(option?.value)}
              className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 text-left ${
                isSelected
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : 'bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-muted'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'bg-primary-foreground/20' : 'bg-muted'
              }`}>
                <Icon name={option?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{option?.label}</span>
                  {isSelected && <Icon name="Check" size={16} />}
                </div>
                <p className={`text-xs mt-1 ${isSelected ? 'opacity-90' : 'text-muted-foreground'}`}>
                  {option?.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DurationSelector;