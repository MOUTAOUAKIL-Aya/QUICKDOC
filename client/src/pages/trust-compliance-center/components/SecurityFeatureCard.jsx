import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatureCard = ({ feature }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
          feature?.level === 'critical' ? 'bg-success/10' : 
          feature?.level === 'high' ? 'bg-primary/10' : 'bg-muted'
        }`}>
          <Icon 
            name={feature?.icon} 
            size={24} 
            color={feature?.level === 'critical' ? 'var(--color-success)' : 
                   feature?.level === 'high' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground mb-2">{feature?.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{feature?.description}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
              <Icon name="Shield" size={14} />
              <span className="text-xs font-medium text-foreground">{feature?.standard}</span>
            </div>
            {feature?.certified && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10">
                <Icon name="Award" size={14} color="var(--color-success)" />
                <span className="text-xs font-medium text-success">Certified</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatureCard;