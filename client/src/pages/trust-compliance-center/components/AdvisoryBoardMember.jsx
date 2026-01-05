import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const AdvisoryBoardMember = ({ member }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 lift-on-hover">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20">
            <Image 
              src={member?.photo} 
              alt={member?.photoAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center border-2 border-card">
            <Icon name="CheckCircle2" size={16} color="white" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{member?.name}</h3>
        <p className="text-sm text-primary font-medium mb-2">{member?.title}</p>
        <p className="text-xs text-muted-foreground mb-3">{member?.specialization}</p>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
            <Icon name="Award" size={12} />
            <span className="text-xs text-foreground">{member?.experience}</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
            <Icon name="MapPin" size={12} color="var(--color-primary)" />
            <span className="text-xs text-primary">{member?.location}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{member?.bio}</p>
      </div>
    </div>
  );
};

export default AdvisoryBoardMember;