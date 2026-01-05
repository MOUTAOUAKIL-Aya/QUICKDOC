import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActionCard = ({ title, description, icon, iconColor, bgColor, link }) => {
  return (
    <Link 
      to={link}
      className="bg-card rounded-lg border border-border p-6 lift-on-hover block transition-all hover:border-primary"
    >
      <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center mb-4`}>
        <Icon name={icon} size={24} color={iconColor} />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <div className="flex items-center gap-2 text-primary text-sm font-medium">
        <span>Get Started</span>
        <Icon name="ArrowRight" size={16} />
      </div>
    </Link>
  );
};

export default QuickActionCard;