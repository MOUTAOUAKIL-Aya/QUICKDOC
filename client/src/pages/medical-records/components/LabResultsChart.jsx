import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const LabResultsChart = ({ data, title, unit, normalRange }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{payload?.[0]?.payload?.date}</p>
          <p className="text-sm text-muted-foreground">
            Value: <span className="font-semibold text-foreground">{payload?.[0]?.value} {unit}</span>
          </p>
          {normalRange && (
            <p className="text-xs text-muted-foreground mt-1">
              Normal: {normalRange?.min}-{normalRange?.max} {unit}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
          {normalRange && (
            <p className="text-sm text-muted-foreground">
              Normal Range: {normalRange?.min}-{normalRange?.max} {unit}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={20} color="var(--color-success)" />
        </div>
      </div>
      <div className="w-full h-64" aria-label={`${title} Trend Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              unit={unit}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-primary)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            {normalRange && (
              <>
                <Line 
                  type="monotone" 
                  dataKey={() => normalRange?.max} 
                  stroke="var(--color-success)" 
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  name="Upper Limit"
                />
                <Line 
                  type="monotone" 
                  dataKey={() => normalRange?.min} 
                  stroke="var(--color-success)" 
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  name="Lower Limit"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LabResultsChart;