import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HealthTipCard = ({ tip }) => {
  return (
    <Link to={`/article/${tip?.id}`} className="block">
      <div className="bg-card rounded-lg border border-border overflow-hidden lift-on-hover hover:border-primary/50 transition-all">
        <div className="h-40 overflow-hidden">
          <Image 
            src={tip?.image} 
            alt={tip?.imageAlt}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              {tip?.category}
            </div>
            <span className="text-xs text-muted-foreground">{tip?.readTime}</span>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
            {tip?.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{tip?.description}</p>
          <div className="flex items-center gap-1 text-primary text-xs font-medium">
            <span>Read More</span>
            <Icon name="ArrowRight" size={14} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HealthTipCard;