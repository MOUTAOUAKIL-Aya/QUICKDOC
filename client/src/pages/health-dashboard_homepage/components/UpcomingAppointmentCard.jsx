import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingAppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Appointment</h3>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
          Today
        </div>
      </div>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={appointment?.doctorImage} 
            alt={appointment?.doctorImageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-semibold text-foreground mb-1">{appointment?.doctorName}</h4>
          <p className="text-sm text-muted-foreground mb-2">{appointment?.specialty}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              <span>{appointment?.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              <span>{appointment?.time}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="default" fullWidth iconName="Video" iconPosition="left">
          Join Video Call
        </Button>
        <Button variant="outline" size="icon">
          <Icon name="MessageSquare" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default UpcomingAppointmentCard;