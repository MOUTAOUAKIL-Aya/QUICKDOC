import React from 'react';
import Icon from '../../../components/AppIcon';

const DurationSelector = ({ duration, onDurationChange }) => {
  // OPTIONS MISES À JOUR AVEC VALEURS NUMÉRIQUES POUR CALCUL
  const durationOptions = [
    { 
      value: 'hours', 
      label: 'Quelques heures', 
      icon: 'Clock', 
      description: 'Début aujourd\'hui',
      days: 0.1, // Moins d'un jour
      impact: 'Faible impact sur l\'analyse'
    },
    { 
      value: '1-3_days', 
      label: '1-3 jours', 
      icon: 'Calendar', 
      description: 'Apparition récente',
      days: 2, // Moyenne de 2 jours
      impact: 'Influence l\'urgence moyenne'
    },
    { 
      value: '4-7_days', 
      label: '4-7 jours', 
      icon: 'CalendarDays', 
      description: 'Environ une semaine',
      days: 5.5, // Moyenne de 5.5 jours
      impact: 'Peut indiquer infection persistante'
    },
    { 
      value: '1-2_weeks', 
      label: '1-2 semaines', 
      icon: 'CalendarRange', 
      description: 'Problème continu',
      days: 10.5, // Moyenne de 10.5 jours
      impact: 'Considéré comme condition prolongée'
    },
    { 
      value: 'over_month', 
      label: 'Plus d\'un mois', 
      icon: 'CalendarClock', 
      description: 'Condition chronique',
      days: 45, // Approximativement 45 jours
      impact: 'Suggère condition chronique'
    }
  ];

  const selectedOption = durationOptions.find(opt => opt.value === duration);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-foreground">
          Depuis combien de temps avez-vous ces symptômes ?
        </label>
        <p className="text-xs text-muted-foreground mt-1">
          La durée aide à différencier les conditions aiguës et chroniques
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {durationOptions?.map((option) => {
          const isSelected = duration === option?.value;
          
          return (
            <button
              key={option?.value}
              onClick={() => onDurationChange(option?.value)}
              className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                isSelected
                  ? 'bg-primary/10 text-primary border-primary shadow-sm'
                  : 'bg-card text-card-foreground border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={option?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-semibold">{option?.label}</span>
                  {isSelected && (
                    <Icon name="CheckCircle" size={16} className="text-primary" />
                  )}
                </div>
                <p className={`text-xs ${isSelected ? 'text-primary/90' : 'text-muted-foreground'}`}>
                  {option?.description}
                </p>
                {isSelected && option.impact && (
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    <Icon name="Info" size={12} className="text-primary" />
                    <span className="text-primary/80">{option.impact}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Carte d'information sur la sélection */}
      {selectedOption && (
        <div className="bg-muted/30 rounded-lg border border-border p-4 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name={selectedOption.icon} size={18} className="text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Durée sélectionnée</h4>
              <p className="text-xs text-muted-foreground">
                {selectedOption.label} • {selectedOption.description}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Valeur pour analyse :</span>
              <span className="font-medium text-foreground">{selectedOption.days} jours</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Impact sur l'analyse :</span>
              <span className="font-medium text-primary">{selectedOption.impact.split(': ')[0]}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Note :</span> 
              {selectedOption.days < 7 
                ? " Les symptômes de courte durée suggèrent généralement des conditions aiguës."
                : " Les symptômes prolongés peuvent indiquer des conditions chroniques nécessitant une évaluation approfondie."
              }
            </p>
          </div>
        </div>
      )}

      {/* Barre de progression de durée */}
      <div className="bg-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-foreground">Échelle de durée</span>
          <span className="text-xs text-muted-foreground">Aigu ← → Chronique</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden relative">
          {/* Marqueurs */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-success"></div>
          <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-success/70"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-warning"></div>
          <div className="absolute left-3/4 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-warning/70"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-3 bg-error"></div>
          
          {/* Indicateur de sélection */}
          {selectedOption && (
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-lg"
              style={{ 
                left: `${(selectedOption.days / 45) * 100}%`,
                maxLeft: '100%'
              }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary whitespace-nowrap">
                {selectedOption.label}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>Heures</span>
          <span>Jours</span>
          <span>Semaines</span>
          <span>Mois</span>
        </div>
      </div>

      {/* Conseils */}
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-3">
        <div className="flex items-start gap-2">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground mb-1">Conseil pour une analyse précise :</p>
            <p className="text-xs text-muted-foreground">
              {!duration 
                ? "Sélectionnez la durée la plus précise. La précision améliore la qualité des recommandations."
                : "Si vos symptômes ont changé d'intensité, considérez la durée depuis le début des symptômes les plus récents."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DurationSelector;