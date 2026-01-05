import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PharmacyLocator = ({ pharmacies, onSelectPharmacy }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const handleSelectPharmacy = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    onSelectPharmacy(pharmacy);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-2">Nearby Pharmacies</h3>
        <p className="text-sm text-muted-foreground">Find pharmacies near you with real-time availability</p>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto scrollbar-thin">
        {pharmacies?.map((pharmacy) => (
          <div
            key={pharmacy?.id}
            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
              selectedPharmacy?.id === pharmacy?.id ? 'bg-primary/5' : ''
            }`}
            onClick={() => handleSelectPharmacy(pharmacy)}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-foreground mb-1">{pharmacy?.name}</h4>
                <p className="text-sm text-muted-foreground">{pharmacy?.address}</p>
              </div>
              {pharmacy?.isGarde && (
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10 flex-shrink-0">
                  <Icon name="Clock" size={14} color="var(--color-success)" />
                  <span className="text-xs font-medium text-success">24/7</span>
                </div>
              )}
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
              <div className={`flex items-center gap-1 ${pharmacy?.isOpen ? 'text-success' : 'text-error'}`}>
                <Icon name="Clock" size={14} />
                <span className="text-xs font-medium">{pharmacy?.isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Navigation"
                iconPosition="left"
                onClick={(e) => {
                  e?.stopPropagation();
                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${pharmacy?.lat},${pharmacy?.lng}`, '_blank');
                }}
              >
                Directions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Phone"
                onClick={(e) => {
                  e?.stopPropagation();
                  window.location.href = `tel:${pharmacy?.phone}`;
                }}
              >
                Call
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PharmacyLocator;