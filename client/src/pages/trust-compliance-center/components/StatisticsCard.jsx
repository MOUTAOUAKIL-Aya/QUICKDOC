import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsCard = ({ stat }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          stat?.trend === 'up' ? 'bg-success/10' : 
          stat?.trend === 'stable' ? 'bg-primary/10' : 'bg-muted'
        }`}>
          <Icon 
            name={stat?.icon} 
            size={24} 
            color={stat?.trend === 'up' ? 'var(--color-success)' : 
                   stat?.trend === 'stable' ? 'var(--color-primary)' : 'var(--color-muted-foreground)'}
          />
        </div>
        {stat?.trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            stat?.trend === 'up' ? 'bg-success/10' : 'bg-primary/10'
          }`}>
            <Icon 
              name={stat?.trend === 'up' ? 'TrendingUp' : 'Minus'} 
              size={14} 
              color={stat?.trend === 'up' ? 'var(--color-success)' : 'var(--color-primary)'}
            />
            <span className={`text-xs font-medium ${
              stat?.trend === 'up' ? 'text-success' : 'text-primary'
            }`}>
              {stat?.change}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-foreground mb-2">{stat?.value}</h3>
      <p className="text-sm text-muted-foreground mb-1">{stat?.label}</p>
      {stat?.description && (
        <p className="text-xs text-muted-foreground">{stat?.description}</p>
      )}
    </div>
  );
};

export default StatisticsCard;