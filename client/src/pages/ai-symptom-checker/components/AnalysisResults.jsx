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
      title: 'Low Urgency',
      message: 'Your symptoms suggest a condition that can be managed with self-care or a routine consultation.'
    },
    medium: {
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/30',
      icon: 'AlertCircle',
      title: 'Moderate Urgency',
      message: 'We recommend scheduling a consultation with a healthcare provider within the next few days.'
    },
    high: {
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/30',
      icon: 'AlertTriangle',
      title: 'High Urgency',
      message: 'Your symptoms require prompt medical attention. Please consult a doctor as soon as possible.'
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
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-base font-semibold text-foreground">AI Analysis Confidence</h4>
          <span className="text-sm font-medium text-primary">{results?.confidence}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${results?.confidence}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Based on symptom analysis and medical knowledge database
        </p>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-base font-semibold text-foreground mb-4">Possible Conditions</h4>
        <div className="space-y-3">
          {results?.possibleConditions?.map((condition, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-semibold text-foreground mb-1">{condition?.name}</h5>
                <p className="text-xs text-muted-foreground">{condition?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-lg border border-border p-6">
        <h4 className="text-base font-semibold text-foreground mb-4">Recommended Specialists</h4>
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
            <h4 className="text-sm font-semibold text-foreground mb-2">Important Notice</h4>
            <p className="text-xs text-muted-foreground">
              This AI analysis is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for accurate diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/doctor-consultation" className="flex-1">
          <Button variant="default" fullWidth iconName="Calendar" iconPosition="left">
            Book Consultation
          </Button>
        </Link>
        <Button variant="outline" onClick={onReset} iconName="RotateCcw" iconPosition="left">
          New Analysis
        </Button>
      </div>
    </div>
  );
};

export default AnalysisResults;