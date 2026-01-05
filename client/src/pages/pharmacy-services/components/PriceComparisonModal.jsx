import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PriceComparisonModal = ({ medication, pharmacyPrices, onClose, onSelectPharmacy }) => {
  if (!medication) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">Price Comparison</h3>
            <p className="text-sm text-muted-foreground">{medication?.name} - {medication?.dosage}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] scrollbar-thin">
          <div className="space-y-3">
            {pharmacyPrices?.map((pharmacy, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-foreground mb-1">{pharmacy?.name}</h4>
                    <p className="text-sm text-muted-foreground">{pharmacy?.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">{pharmacy?.price} MAD</div>
                    {pharmacy?.savings && (
                      <div className="text-xs text-success">Save {pharmacy?.savings} MAD</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{pharmacy?.distance}</span>
                  </div>
                  <div className={`flex items-center gap-1 ${pharmacy?.inStock ? 'text-success' : 'text-warning'}`}>
                    <Icon name="Package" size={14} />
                    <span className="text-xs font-medium">{pharmacy?.inStock ? 'In Stock' : 'Limited Stock'}</span>
                  </div>
                  {pharmacy?.deliveryAvailable && (
                    <div className="flex items-center gap-1 text-primary">
                      <Icon name="Truck" size={14} />
                      <span className="text-xs font-medium">Delivery Available</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  iconName="ShoppingCart"
                  iconPosition="left"
                  onClick={() => {
                    onSelectPharmacy(pharmacy);
                    onClose();
                  }}
                  disabled={!pharmacy?.inStock}
                >
                  Order from this Pharmacy
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceComparisonModal;