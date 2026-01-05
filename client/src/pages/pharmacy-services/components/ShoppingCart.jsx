import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ShoppingCart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const deliveryFee = subtotal > 200 ? 0 : 25;
  const total = subtotal + deliveryFee;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Shopping Cart</h3>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
            <Icon name="ShoppingCart" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">{cartItems?.length} items</span>
          </div>
        </div>
      </div>
      {cartItems?.length === 0 ? (
        <div className="p-8 text-center">
          <Icon name="ShoppingCart" size={48} className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-border max-h-96 overflow-y-auto scrollbar-thin">
            {cartItems?.map((item) => (
              <div key={item?.id} className="p-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt={item?.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground mb-1 truncate">{item?.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{item?.dosage}</p>
                    
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item?.id, Math.max(1, item?.quantity - 1))}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-8 text-center">{item?.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item?.id, item?.quantity + 1)}
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">{item?.price * item?.quantity} MAD</span>
                        <button
                          onClick={() => onRemoveItem(item?.id)}
                          className="w-7 h-7 rounded-md hover:bg-error/10 flex items-center justify-center transition-colors"
                        >
                          <Icon name="Trash2" size={14} color="var(--color-error)" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">{subtotal?.toFixed(2)} MAD</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium text-foreground">
                {deliveryFee === 0 ? (
                  <span className="text-success">Free</span>
                ) : (
                  `${deliveryFee?.toFixed(2)} MAD`
                )}
              </span>
            </div>
            {subtotal < 200 && (
              <p className="text-xs text-info">Add {(200 - subtotal)?.toFixed(2)} MAD more for free delivery</p>
            )}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <span className="text-base font-semibold text-foreground">Total</span>
              <span className="text-xl font-bold text-primary">{total?.toFixed(2)} MAD</span>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              iconName="CreditCard"
              iconPosition="left"
              onClick={onCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;