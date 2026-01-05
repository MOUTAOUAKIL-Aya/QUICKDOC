import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VaccinationTracker = ({ vaccinations }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-success bg-success/10',
      upcoming: 'text-warning bg-warning/10',
      overdue: 'text-destructive bg-destructive/10'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: 'CheckCircle2',
      upcoming: 'Clock',
      overdue: 'AlertCircle'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="space-y-4">
      {vaccinations?.map((vaccine) => (
        <div key={vaccine?.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${getStatusColor(vaccine?.status)}`}>
              <Icon name={getStatusIcon(vaccine?.status)} size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{vaccine?.name}</h3>
                  <p className="text-sm text-muted-foreground">{vaccine?.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${getStatusColor(vaccine?.status)}`}>
                  {vaccine?.status?.charAt(0)?.toUpperCase() + vaccine?.status?.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {vaccine?.lastDose && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} />
                    <span>Last: {vaccine?.lastDose}</span>
                  </div>
                )}
                {vaccine?.nextDose && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="CalendarClock" size={16} />
                    <span>Next: {vaccine?.nextDose}</span>
                  </div>
                )}
              </div>

              {vaccine?.notes && (
                <p className="text-sm text-muted-foreground mb-3">{vaccine?.notes}</p>
              )}

              {vaccine?.status === 'upcoming' && (
                <Button variant="outline" size="sm" iconName="Bell" iconPosition="left">
                  Set Reminder
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VaccinationTracker;