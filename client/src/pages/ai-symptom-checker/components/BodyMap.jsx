import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BodyMap = ({ selectedAreas, onAreaSelect }) => {
  const [hoveredArea, setHoveredArea] = useState(null);

  // ZONES MISES À JOUR POUR MATCHER LES RÈGLES MÉDICALES
  const bodyAreas = [
    { id: 'head', name: 'Tête & Visage', x: 50, y: 8, icon: 'Brain', category: 'Céphalique' },
    { id: 'eyes', name: 'Yeux', x: 45, y: 12, icon: 'Eye', category: 'Céphalique' },
    { id: 'nose', name: 'Nez', x: 55, y: 12, icon: 'CircleDot', category: 'Respiratoire' },
    { id: 'throat', name: 'Gorge', x: 50, y: 18, icon: 'Mic', category: 'Respiratoire' },
    { id: 'chest', name: 'Poitrine', x: 50, y: 30, icon: 'Heart', category: 'Thoracique' },
    { id: 'stomach', name: 'Estomac', x: 50, y: 45, icon: 'Activity', category: 'Abdominal' },
    { id: 'pelvis', name: 'Bassin', x: 50, y: 60, icon: 'Target', category: 'Pelvien' },
    { id: 'left_arm', name: 'Bras Gauche', x: 25, y: 35, icon: 'Hand', category: 'Membre' },
    { id: 'right_arm', name: 'Bras Droit', x: 75, y: 35, icon: 'Hand', category: 'Membre' },
    { id: 'left_leg', name: 'Jambe Gauche', x: 40, y: 70, icon: 'Footprints', category: 'Membre' },
    { id: 'right_leg', name: 'Jambe Droite', x: 60, y: 70, icon: 'Footprints', category: 'Membre' },
    { id: 'back', name: 'Dos', x: 50, y: 38, icon: 'User', category: 'Dorsal' }
  ];

  // Statistiques de sélection
  const selectedCount = selectedAreas?.length || 0;
  const categoriesSelected = [...new Set(selectedAreas?.map(id => 
    bodyAreas.find(area => area.id === id)?.category
  ))].filter(Boolean);

  const handleAreaClick = (areaId) => {
    onAreaSelect(areaId);
  };

  return (
    <div className="relative w-full h-[550px] bg-muted/30 rounded-lg border border-border overflow-hidden">
      {/* SVG du corps simplifié */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full max-w-md">
          {/* Tête */}
          <ellipse cx="50" cy="10" rx="8" ry="10" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          
          {/* Cou */}
          <rect x="47" y="18" width="6" height="5" rx="1" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          
          {/* Poitrine */}
          <ellipse cx="50" cy="30" rx="12" ry="15" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          
          {/* Abdomen */}
          <ellipse cx="50" cy="45" rx="11" ry="10" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          
          {/* Bassin */}
          <ellipse cx="50" cy="60" rx="10" ry="8" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="0.5" />
          
          {/* Bras gauche */}
          <line x1="38" y1="28" x2="20" y2="45" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Bras droit */}
          <line x1="62" y1="28" x2="80" y2="45" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Jambe gauche */}
          <line x1="45" y1="62" x2="42" y2="90" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Jambe droite */}
          <line x1="55" y1="62" x2="58" y2="90" stroke="var(--color-border)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Points interactifs */}
      {bodyAreas?.map((area) => {
        const isSelected = selectedAreas?.includes(area?.id);
        const isHovered = hoveredArea === area?.id;

        return (
          <button
            key={area?.id}
            onClick={() => handleAreaClick(area?.id)}
            onMouseEnter={() => setHoveredArea(area?.id)}
            onMouseLeave={() => setHoveredArea(null)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10 ${
              isSelected ? 'scale-110' : isHovered ? 'scale-105' : 'scale-100'
            }`}
            style={{ left: `${area?.x}%`, top: `${area?.y}%` }}
            aria-label={`Sélectionner ${area?.name}`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20'
                  : isHovered
                  ? 'bg-primary/20 text-primary ring-2 ring-primary/30'
                  : 'bg-background/80 text-muted-foreground hover:bg-muted'
              } border-2 ${isSelected ? 'border-primary' : 'border-border'}`}
            >
              <Icon name={area?.icon} size={18} />
            </div>
            
            {/* Étiquette */}
            {(isHovered || isSelected) && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20">
                <span className="text-xs font-medium px-2 py-1 rounded-md bg-popover text-popover-foreground shadow-md border border-border">
                  {area?.name}
                </span>
              </div>
            )}
          </button>
        );
      })}

      {/* Légende et statistiques */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 border border-border shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-foreground">Zones sélectionnées</p>
            <p className="text-xs text-muted-foreground">
              {selectedCount} zone{selectedCount !== 1 ? 's' : ''} • {categoriesSelected.length} catégorie{categoriesSelected.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Sélectionné</span>
          </div>
        </div>
        
        {/* Zones sélectionnées en texte */}
        {selectedCount > 0 && (
          <div className="flex flex-wrap gap-1">
            {selectedAreas?.map(areaId => {
              const area = bodyAreas.find(a => a.id === areaId);
              return area ? (
                <span 
                  key={areaId} 
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                >
                  <Icon name={area.icon} size={12} />
                  {area.name}
                </span>
              ) : null;
            })}
          </div>
        )}
        
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Cliquez sur les zones du corps pour indiquer où vous ressentez des symptômes
          </p>
        </div>
      </div>

      {/* Instructions flottantes */}
      <div className="absolute top-4 left-4 bg-primary/10 border border-primary/20 rounded-lg p-3 max-w-xs">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">Conseil :</p>
            <p className="text-xs text-muted-foreground mt-1">
              Sélectionnez toutes les zones concernées. L'analyse sera plus précise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyMap;