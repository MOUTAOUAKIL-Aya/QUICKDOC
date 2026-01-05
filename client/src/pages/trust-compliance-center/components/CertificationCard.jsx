import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const CertificationCard = ({ certification }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 lift-on-hover">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Image 
            src={certification?.logo} 
            alt={certification?.logoAlt}
            className="w-12 h-12 object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">{certification?.name}</h3>
            {certification?.verified && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-success/10">
                <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                <span className="text-xs font-medium text-success">Verified</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-3">{certification?.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>Issued: {certification?.issueDate}</span>
            </div>
            {certification?.expiryDate && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                <span>Expires: {certification?.expiryDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationCard;