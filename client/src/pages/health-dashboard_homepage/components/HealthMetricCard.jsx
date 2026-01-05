import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthMetricCard = ({ title, value, unit, icon, iconColor, bgColor, trend, trendValue }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
          <Icon name={icon} size={20} color={iconColor} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={12} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <h4 className="text-sm text-muted-foreground mb-1">{title}</h4>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default HealthMetricCard;