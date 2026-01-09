import React from 'react';
import Icon from '../../../components/AppIcon';

const SeveritySlider = ({ severity, onSeverityChange }) => {
  const severityLevels = [
    { 
      value: 1, 
      label: 'Légère', 
      color: 'text-success', 
      bgColor: 'bg-success/10', 
      icon: 'Smile',
      description: "Gêne légère sans impact sur les activités quotidiennes.",
      action: "Autosoins et surveillance"
    },
    { 
      value: 2, 
      label: 'Modérée', 
      color: 'text-warning', 
      bgColor: 'bg-warning/10', 
      icon: 'Meh',
      description: "Inconfort notable affectant certaines activités.",
      action: "Consultation recommandée sous 48h"
    },
    { 
      value: 3, 
      label: 'Sévère', 
      color: 'text-error', 
      bgColor: 'bg-error/10', 
      icon: 'Frown',
      description: "Symptômes intenses perturbant les activités normales.",
      action: "Consultation médicale urgente recommandée"
    }
  ];

  const currentLevel = severityLevels?.find(level => level?.value === severity) || severityLevels?.[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-foreground">Sévérité des Symptômes</label>
          <p className="text-xs text-muted-foreground">Évaluez l'intensité de votre inconfort</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${currentLevel?.bgColor}`}>
          <Icon name={currentLevel?.icon} size={16} className={currentLevel?.color} />
          <span className={`text-sm font-semibold ${currentLevel?.color}`}>{currentLevel?.label}</span>
        </div>
      </div>
      
      <div className="relative pt-6 pb-4">
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
              className={`flex flex-col items-center gap-2 transition-all ${
                severity === level?.value ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-70'
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${level?.bgColor} flex items-center justify-center border-2 ${
                severity === level?.value ? 'border-primary' : 'border-transparent'
              }`}>
                <Icon name={level?.icon} size={18} className={level?.color} />
              </div>
              <span className={`text-xs font-medium ${level?.color}`}>{level?.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* NOUVEAU : Carte d'information détaillée */}
      <div className={`rounded-lg border-2 ${currentLevel?.borderColor || 'border-border'} ${currentLevel?.bgColor} p-4`}>
        <div className="flex items-start gap-3">
          <Icon name={currentLevel?.icon} size={20} className={currentLevel?.color} />
          <div>
            <h4 className={`text-sm font-semibold ${currentLevel?.color} mb-1`}>
              Niveau {currentLevel?.value}/3 - {currentLevel?.label}
            </h4>
            <p className="text-xs text-foreground mb-2">{currentLevel?.description}</p>
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Clock" size={12} className="text-muted-foreground" />
              <span className="font-medium text-foreground">Recommandation :</span>
              <span className="text-muted-foreground">{currentLevel?.action}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur d'impact sur l'analyse */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Impact sur l'analyse :</span>
          <span className={`text-xs font-medium ${currentLevel?.color}`}>
            {severity === 1 ? 'Faible' : severity === 2 ? 'Modéré' : 'Élevé'}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {severity === 1 && "Cette sévérité influence principalement la recommandation de spécialiste."}
          {severity === 2 && "Cette sévérité augmente l'urgence et influence les conditions suggérées."}
          {severity === 3 && "Cette sévérité peut indiquer la nécessité d'une consultation urgente."}
        </p>
      </div>
    </div>
  );
};

export default SeveritySlider;