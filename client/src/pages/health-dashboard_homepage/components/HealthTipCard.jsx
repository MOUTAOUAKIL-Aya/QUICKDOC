import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HealthTipCard = ({ tip }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden lift-on-hover">
      <div className="h-40 overflow-hidden">
        <Image 
          src={tip?.image} 
          alt={tip?.imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {tip?.category}
          </div>
          <span className="text-xs text-muted-foreground">{tip?.readTime}</span>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-2">{tip?.title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{tip?.description}</p>
        <button className="flex items-center gap-1 text-primary text-xs font-medium hover:gap-2 transition-all">
          <span>Read More</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default HealthTipCard;