import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyPharmacyFinder = ({ gardePharmacies }) => {
  return (
    <div className="bg-gradient-to-br from-error/10 to-warning/10 border border-error/20 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-error/20 flex items-center justify-center flex-shrink-0">
          <Icon name="AlertCircle" size={24} color="var(--color-error)" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1">Emergency Pharmacy Finder</h3>
          <p className="text-sm text-muted-foreground">
            Find 24/7 garde pharmacies for urgent medication needs
          </p>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        {gardePharmacies?.map((pharmacy) => (
          <div
            key={pharmacy?.id}
            className="bg-background border border-border rounded-lg p-4"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-foreground mb-1">{pharmacy?.name}</h4>
                <p className="text-sm text-muted-foreground">{pharmacy?.address}</p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 flex-shrink-0">
                <Icon name="Clock" size={14} color="var(--color-success)" />
                <span className="text-xs font-medium text-success">Open 24/7</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{pharmacy?.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Phone" size={14} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{pharmacy?.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${pharmacy?.lat},${pharmacy?.lng}`, '_blank')}
              >
                Get Directions
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                onClick={() => window.location.href = `tel:${pharmacy?.phone}`}
              >
                Call Now
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-warning/10 flex items-start gap-2">
        <Icon name="Info" size={16} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
        <p className="text-xs text-warning">
          Garde pharmacies rotate weekly. Call ahead to confirm availability of specific medications.
        </p>
      </div>
    </div>
  );
};

export default EmergencyPharmacyFinder;