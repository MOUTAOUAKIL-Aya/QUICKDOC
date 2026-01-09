import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalysisResults = ({ results, onReset }) => {
  const urgencyConfig = {
    low: {
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/30',
      icon: 'CheckCircle2',
      title: 'Faible Urgence',
      message: 'Vos symptômes suggèrent une condition qui peut être gérée avec des soins personnels.'
    },
    medium: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      icon: 'AlertCircle',
      title: 'Urgence Modérée',
      message: 'Nous recommandons de consulter un professionnel de santé dans les prochains jours.'
    },
    high: {
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/30',
      icon: 'AlertTriangle',
      title: 'Haute Urgence',
      message: 'Vos symptômes nécessitent une attention médicale rapide.'
    }
  };

  const config = urgencyConfig?.[results?.urgency];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className={`rounded-lg border-2 ${config?.borderColor} ${config?.bgColor} p-6`}>
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-full ${config?.bgColor} flex items-center justify-center flex-shrink-0`}>
            <Icon name={config?.icon} size={24} className={config?.color} />
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${config?.color} mb-2`}>{config?.title}</h3>
            <p className="text-sm text-foreground">{config?.message}</p>
          </div>
        </div>
      </div>
      
      {/* NOUVEAU : Section d'analyse détaillée */}
      {results?.matchDetails && (
        <div className="bg-card rounded-lg border border-border p-6">
          <h4 className="text-base font-semibold text-foreground mb-4">Détails de l'Analyse</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Zones analysées :</span>
              <span className="font-medium">{results?.areaCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Symptômes identifiés :</span>
              <span className="font-medium">{results?.symptomCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Durée des symptômes :</span>
              <span className="font-medium">{results?.duration || 'Non spécifié'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Niveau de douleur :</span>
              <span className="font-medium">{results?.severity || 1}/3</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold text-foreground">Confiance de l'Analyse</h4>
          <span className="text-sm font-medium text-primary">{results?.confidence}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${results?.confidence}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Basé sur l'analyse des symptômes et la correspondance avec notre base de connaissances
        </p>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-base font-semibold text-foreground mb-4">Conditions Possibles</h4>
        <div className="space-y-3">
          {results?.possibleConditions?.map((condition, index) => (
            <div key={condition?.id || index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-sm font-semibold text-foreground">{condition?.name}</h5>
                  {condition?.matchPercentage && (
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {condition?.matchPercentage}% match
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{condition?.description}</p>
                {condition?.confidence && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: `${condition?.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{condition?.confidence}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-base font-semibold text-foreground mb-4">Spécialistes Recommandés</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results?.recommendedSpecialists?.map((specialist, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Icon name="UserRound" size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{specialist}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-primary/5 rounded-lg border border-primary/20 p-6">
        <div className="flex items-start gap-3 mb-4">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">Note Importante</h4>
            <p className="text-xs text-muted-foreground">
              {results?.note || "Cette analyse est basée sur des règles médicales générales et ne remplace pas une consultation médicale. Consultez toujours un professionnel de santé qualifié."}
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/doctor-consultation" className="flex-1">
          <Button variant="default" fullWidth iconName="Calendar" iconPosition="left">
            Prendre Rendez-vous
          </Button>
        </Link>
        <Button variant="outline" onClick={onReset} iconName="RotateCcw" iconPosition="left">
          Nouvelle Analyse
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;