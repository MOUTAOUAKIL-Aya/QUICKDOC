import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SymptomSelector = ({ selectedSymptoms, onSymptomToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // SYMPTÔMES MIS À JOUR POUR MATCHER LES RÈGLES
  const commonSymptoms = [
    { id: 'fever', name: 'Fièvre', icon: 'Thermometer', category: 'Général' },
    { id: 'cough', name: 'Toux', icon: 'Wind', category: 'Respiratoire' },
    { id: 'fatigue', name: 'Fatigue', icon: 'Battery', category: 'Général' },
    { id: 'sore_throat', name: 'Mal de gorge', icon: 'Mic', category: 'Gorge' },
    { id: 'headache', name: 'Mal de tête', icon: 'Brain', category: 'Tête' },
    { id: 'nausea', name: 'Nausées', icon: 'CircleAlert', category: 'Digestif' },
    { id: 'vomiting', name: 'Vomissements', icon: 'Activity', category: 'Digestif' },
    { id: 'diarrhea', name: 'Diarrhée', icon: 'Waves', category: 'Digestif' },
    { id: 'stomach_pain', name: 'Douleur d\'estomac', icon: 'Activity', category: 'Digestif' },
    { id: 'sneezing', name: 'Éternuements', icon: 'Wind', category: 'Respiratoire' },
    { id: 'runny_nose', name: 'Nez qui coule', icon: 'Droplets', category: 'Respiratoire' },
    { id: 'itchy_eyes', name: 'Yeux qui démangent', icon: 'Eye', category: 'Yeux' },
    { id: 'congestion', name: 'Congestion', icon: 'Activity', category: 'Respiratoire' },
    { id: 'light_sensitivity', name: 'Sensibilité à la lumière', icon: 'Sun', category: 'Tête' },
    { id: 'frequent_urination', name: 'Mictions fréquentes', icon: 'Droplets', category: 'Urinaire' },
    { id: 'burning_urination', name: 'Brûlure urinaire', icon: 'Flame', category: 'Urinaire' },
    { id: 'pelvic_pain', name: 'Douleur pelvienne', icon: 'Target', category: 'Pelvien' },
    { id: 'muscle_pain', name: 'Douleur musculaire', icon: 'Dumbbell', category: 'Musculaire' },
    { id: 'stiffness', name: 'Raideur', icon: 'Lock', category: 'Musculaire' }
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
          placeholder="Rechercher un symptôme..."
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
            {selectedSymptoms?.length} symptôme{selectedSymptoms?.length !== 1 ? 's' : ''} sélectionné(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomSelector;