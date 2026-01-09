import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricCard = ({ title, value, unit, icon, iconColor, bgColor, trend, trendValue }) => {
  
  // Vérifie si c'est un objet fixe ou une valeur normale
  const isFixedObject = value && typeof value === 'object' && value.isFixed === true;
  
  // Extrait les valeurs selon le type
  const displayValue = isFixedObject ? value.value : value;
  const displayUnit = isFixedObject ? value.unit : unit;
  const displayLabel = isFixedObject ? value.label : title;
  
  // Vérifie si la valeur est indisponible (pas un objet fixe et valeur N/A/null)
  const isValueUnavailable = !isFixedObject && (value === "N/A" || value === null || value === undefined);
  
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon 
            name={isValueUnavailable ? "HelpCircle" : icon} 
            size={20} 
            color={isValueUnavailable ? "var(--color-muted-foreground)" : iconColor} 
          />
        </div>

        {!isFixedObject && trend && trendValue && !isValueUnavailable && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-success/10 text-success' : 
            trend === 'down' ? 'bg-destructive/10 text-destructive' : 
            'bg-muted text-muted-foreground'
          }`}>
            <Icon 
              name={
                trend === 'up' ? 'TrendingUp' : 
                trend === 'down' ? 'TrendingDown' : 
                'Minus'
              } 
              size={12} 
            />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <h4 className="text-sm text-muted-foreground mb-1">
        {isFixedObject ? displayLabel : title}
      </h4>
      
      <div className="flex items-baseline gap-1">
        {isValueUnavailable ? (
          <div className="flex items-center gap-2">
            <span className="text-base font-medium text-muted-foreground">Not available</span>
            <button 
              className="text-xs text-primary hover:text-primary/80 underline"
              onClick={() => {/* Logique pour ajouter la donnée */}}
            >
              Add
            </button>
          </div>
        ) : (
          <>
            <span className="text-2xl font-bold text-foreground">{displayValue}</span>
            <span className="text-sm text-muted-foreground">{displayUnit}</span>
          </>
        )}
      </div>
      
      {isFixedObject && (
        <p className="text-xs text-muted-foreground mt-2 italic">
          Average healthy measurements
        </p>
      )}
    </div>
  );
};

export default HealthMetricCard;