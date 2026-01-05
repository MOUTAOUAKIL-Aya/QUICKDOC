import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MedicationCard = ({ medication, onAddToCart, onCompare }) => {
  const { name, activeIngredient, dosage, price, availability, image, imageAlt, pharmacyCount, requiresPrescription } = medication;

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
          <Image
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground mb-1 truncate">{name}</h3>
              <p className="text-sm text-muted-foreground">{activeIngredient} • {dosage}</p>
            </div>
            {requiresPrescription && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-warning/10 flex-shrink-0">
                <Icon name="FileText" size={14} color="var(--color-warning)" />
                <span className="text-xs font-medium text-warning">Rx</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <Icon name="MapPin" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{pharmacyCount} pharmacies</span>
            </div>
            <div className={`flex items-center gap-1 ${availability === 'In Stock' ? 'text-success' : 'text-warning'}`}>
              <Icon name="Package" size={14} />
              <span className="text-xs font-medium">{availability}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-lg font-bold text-primary">{price} MAD</span>
              <span className="text-xs text-muted-foreground ml-2">per unit</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="BarChart3"
                onClick={() => onCompare(medication)}
              >
                Compare
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="ShoppingCart"
                iconPosition="left"
                onClick={() => onAddToCart(medication)}
                disabled={availability === 'Out of Stock'}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationCard;