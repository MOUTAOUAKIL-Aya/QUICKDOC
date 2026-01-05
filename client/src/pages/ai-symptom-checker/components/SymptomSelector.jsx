import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SymptomSelector = ({ selectedSymptoms, onSymptomToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const commonSymptoms = [
    { id: 'fever', name: 'Fever', icon: 'Thermometer', category: 'General' },
    { id: 'headache', name: 'Headache', icon: 'Brain', category: 'Head' },
    { id: 'cough', name: 'Cough', icon: 'Wind', category: 'Respiratory' },
    { id: 'fatigue', name: 'Fatigue', icon: 'Battery', category: 'General' },
    { id: 'nausea', name: 'Nausea', icon: 'CircleAlert', category: 'Digestive' },
    { id: 'chestPain', name: 'Chest Pain', icon: 'Heart', category: 'Chest' },
    { id: 'shortnessBreath', name: 'Shortness of Breath', icon: 'Waves', category: 'Respiratory' },
    { id: 'dizziness', name: 'Dizziness', icon: 'CircleDot', category: 'Head' },
    { id: 'soreThroat', name: 'Sore Throat', icon: 'Mic', category: 'Throat' },
    { id: 'muscleAche', name: 'Muscle Ache', icon: 'Dumbbell', category: 'Musculoskeletal' },
    { id: 'stomachPain', name: 'Stomach Pain', icon: 'Activity', category: 'Digestive' },
    { id: 'rash', name: 'Skin Rash', icon: 'Sparkles', category: 'Skin' }
  ];

  const filteredSymptoms = commonSymptoms?.filter(symptom =>
    symptom?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const categories = [...new Set(filteredSymptoms.map(s => s.category))];

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background z-10 pb-4">
        <Input
          type="search"
          placeholder="Search symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      <div className="space-y-6 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
        {categories?.map(category => {
          const categorySymptoms = filteredSymptoms?.filter(s => s?.category === category);
          
          return (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{category}</h4>
              <div className="grid grid-cols-2 gap-2">
                {categorySymptoms?.map(symptom => {
                  const isSelected = selectedSymptoms?.includes(symptom?.id);
                  
                  return (
                    <button
                      key={symptom?.id}
                      onClick={() => onSymptomToggle(symptom?.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary shadow-md'
                          : 'bg-card text-card-foreground border-border hover:border-primary/50 hover:bg-muted'
                      }`}
                    >
                      <Icon name={symptom?.icon} size={18} />
                      <span className="text-sm font-medium">{symptom?.name}</span>
                      {isSelected && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {selectedSymptoms?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {selectedSymptoms?.length} symptom{selectedSymptoms?.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;