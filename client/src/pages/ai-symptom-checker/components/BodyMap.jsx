import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BodyMap = ({ selectedAreas, onAreaSelect }) => {
  const [hoveredArea, setHoveredArea] = useState(null);

  const bodyAreas = [
    { id: 'head', name: 'Head & Face', x: 50, y: 8, icon: 'Brain' },
    { id: 'neck', name: 'Neck', x: 50, y: 18, icon: 'CircleDot' },
    { id: 'chest', name: 'Chest', x: 50, y: 30, icon: 'Heart' },
    { id: 'abdomen', name: 'Abdomen', x: 50, y: 45, icon: 'Activity' },
    { id: 'leftArm', name: 'Left Arm', x: 25, y: 35, icon: 'Hand' },
    { id: 'rightArm', name: 'Right Arm', x: 75, y: 35, icon: 'Hand' },
    { id: 'leftLeg', name: 'Left Leg', x: 40, y: 70, icon: 'Footprints' },
    { id: 'rightLeg', name: 'Right Leg', x: 60, y: 70, icon: 'Footprints' },
    { id: 'back', name: 'Back', x: 50, y: 55, icon: 'User' }
  ];

  const handleAreaClick = (areaId) => {
    onAreaSelect(areaId);
  };

  return (
    <div className="relative w-full h-[500px] bg-muted/30 rounded-lg border border-border overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-md">
          <ellipse cx="50" cy="10" rx="8" ry="10" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          <rect x="45" y="18" width="10" height="8" rx="2" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          <ellipse cx="50" cy="35" rx="12" ry="15" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          <ellipse cx="50" cy="52" rx="11" ry="12" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          <line x1="38" y1="28" x2="20" y2="45" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="28" x2="80" y2="45" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          <line x1="45" y1="62" x2="42" y2="90" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          <line x1="55" y1="62" x2="58" y2="90" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
      {bodyAreas?.map((area) => {
        const isSelected = selectedAreas?.includes(area?.id);
        const isHovered = hoveredArea === area?.id;

        return (
          <button
            key={area?.id}
            onClick={() => handleAreaClick(area?.id)}
            onMouseEnter={() => setHoveredArea(area?.id)}
            onMouseLeave={() => setHoveredArea(null)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              isSelected ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{ left: `${area?.x}%`, top: `${area?.y}%` }}
            aria-label={`Select ${area?.name}`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : isHovered
                  ? 'bg-primary/20 text-primary' :'bg-background/80 text-muted-foreground hover:bg-muted'
              } border-2 ${isSelected ? 'border-primary' : 'border-border'}`}
            >
              <Icon name={area?.icon} size={20} />
            </div>
            {(isHovered || isSelected) && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-popover text-popover-foreground shadow-md border border-border">
                  {area?.name}
                </span>
              </div>
            )}
          </button>
        );
      })}
      <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border">
        <p className="text-xs text-muted-foreground text-center">
          Click on body areas to indicate where you're experiencing symptoms
        </p>
      </div>
    </div>
  );
};

export default BodyMap;