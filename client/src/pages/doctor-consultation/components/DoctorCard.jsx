import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DoctorCard = ({ doctor, onBookConsultation, onViewProfile }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 lift-on-hover">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20">
            <Image
              src={doctor?.image}
              alt={doctor?.imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
          {doctor?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="BadgeCheck" size={16} color="white" />
            </div>
          )}
          {doctor?.isOnline && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-card" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {doctor?.name}
          </h3>
          <p className="text-sm text-primary font-medium mb-2">{doctor?.specialization}</p>
          
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={16} color="var(--color-warning)" fill="var(--color-warning)" />
              <span className="text-sm font-medium text-foreground">{doctor?.rating}</span>
              <span className="text-xs text-muted-foreground">({doctor?.reviews})</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name="Briefcase" size={14} />
              <span className="text-xs">{doctor?.experience}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Icon name="MapPin" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">{doctor?.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {doctor?.languages?.map((lang, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Consultation Fee</span>
          <span className="text-lg font-semibold text-foreground">{doctor?.consultationFee} MAD</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewProfile(doctor)}
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Video"
            iconPosition="left"
            onClick={() => onBookConsultation(doctor)}
            disabled={!doctor?.isAvailable}
          >
            {doctor?.isAvailable ? 'Book Now' : 'Unavailable'}
          </Button>
        </div>
      </div>
      {doctor?.nextAvailable && (
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Next available: {doctor?.nextAvailable}</span>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;