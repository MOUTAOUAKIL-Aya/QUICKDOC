import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'consultation':
        return 'Video';
      case 'prescription':
        return 'FileText';
      case 'lab':
        return 'FlaskConical';
      case 'medication':
        return 'Pill';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'consultation':
        return 'bg-primary/10 text-primary';
      case 'prescription':
        return 'bg-secondary/10 text-secondary';
      case 'lab':
        return 'bg-accent/10 text-accent';
      case 'medication':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className={`w-10 h-10 rounded-lg ${getActivityColor(activity?.type)} flex items-center justify-center flex-shrink-0`}>
        <Icon name={getActivityIcon(activity?.type)} size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground mb-1">{activity?.title}</h4>
        <p className="text-xs text-muted-foreground">{activity?.description}</p>
        <span className="text-xs text-muted-foreground mt-1 block">{activity?.time}</span>
      </div>
    </div>
  );
};

export default RecentActivityItem;