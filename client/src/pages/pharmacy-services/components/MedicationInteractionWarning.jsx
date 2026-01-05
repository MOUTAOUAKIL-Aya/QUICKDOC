import React from 'react';
import Icon from '../../../components/AppIcon';

const MedicationInteractionWarning = ({ interactions }) => {
  if (!interactions || interactions?.length === 0) return null;

  return (
    <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-foreground mb-2">Medication Interaction Warning</h4>
          <div className="space-y-2">
            {interactions?.map((interaction, index) => (
              <div key={index} className="text-sm text-foreground">
                <p className="font-medium mb-1">{interaction?.medications}</p>
                <p className="text-muted-foreground">{interaction?.warning}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-warning mt-3">
            Please consult with your doctor or pharmacist before taking these medications together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicationInteractionWarning;