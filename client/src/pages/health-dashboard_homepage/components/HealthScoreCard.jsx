import React from 'react';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom'; // IMPORTANT: Ajoutez cette importation

const HealthScoreCard = ({ score, trend, lastUpdated, showCompletionMessage = false }) => {
  
  // Si pas assez de données, afficher le message pour compléter le profil
  if (showCompletionMessage) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm lift-on-hover">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="AlertCircle" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Profil incomplet
            </h3>
            <p className="text-muted-foreground mb-4">
              Ajoutez votre poids, taille ou informations médicales pour obtenir votre score de santé personnalisé.
            </p>
            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <span>Compléter mon profil</span>
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fonctions pour le score (gardez vos fonctions existantes)
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  // Calculs pour le cercle de progression
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-card rounded-lg border border-border p-6 lift-on-hover">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Your Health Score</h3>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <div className={`p-2 rounded-lg ${getScoreBgColor(score)}`}>
          <Icon 
            name="Activity" 
            size={20} 
            color={
              score >= 80 ? 'var(--color-success)' : 
              score >= 60 ? 'var(--color-warning)' : 
              'var(--color-destructive)'
            } 
          />
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-muted"
            />
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={`health-score-ring ${getScoreColor(score)} transition-all duration-1000`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score || 0}
            </span>
            <span className="text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Icon 
          name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
          size={16} 
          color={
            trend === 'up' ? 'var(--color-success)' : 
            trend === 'down' ? 'var(--color-destructive)' : 
            'var(--color-muted-foreground)'
          } 
        />
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-success' : 
          trend === 'down' ? 'text-destructive' : 
          'text-muted-foreground'
        }`}>
          {trend === 'up' ? '+5 points this week' : 
           trend === 'down' ? '-3 points this week' : 
           'No change'}
        </span>
      </div>
    </div>
  );
};

export default HealthScoreCard;