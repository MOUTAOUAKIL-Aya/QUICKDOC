import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MedicationReminderCard = ({ medications }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Today's Medications</h3>
          <p className="text-sm text-muted-foreground">{medications?.length} medications scheduled</p>
        </div>
        <div className="p-2 rounded-lg bg-accent/10">
          <Icon name="Pill" size={20} color="var(--color-accent)" />
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {medications?.map((med) => (
          <div key={med?.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${med?.taken ? 'bg-success' : 'bg-warning'}`} />
              <div>
                <h4 className="text-sm font-medium text-foreground">{med?.name}</h4>
                <p className="text-xs text-muted-foreground">{med?.dosage} • {med?.time}</p>
              </div>
            </div>
            {!med?.taken && (
              <Button variant="outline" size="sm">
                Mark Taken
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button variant="ghost" fullWidth iconName="Plus" iconPosition="left">
        Add Medication
      </Button>
    </div>
  );
};

export default MedicationReminderCard;