import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const FamilyMemberCard = ({ member }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 lift-on-hover cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <Image 
            src={member?.avatar} 
            alt={member?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{member?.name}</h4>
          <p className="text-xs text-muted-foreground">{member?.relation}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Icon name="Activity" size={14} color="var(--color-success)" />
          <span className="text-xs text-success font-medium">Healthy</span>
        </div>
        <button className="text-primary hover:text-primary/80 transition-colors">
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
};

export default FamilyMemberCard;