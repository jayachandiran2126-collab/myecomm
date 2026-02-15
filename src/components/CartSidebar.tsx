import React from 'react';
import { ShoppingCart, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { items, updateQuantity, removeFromCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg animate-slide-in w-72">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold text-card-foreground">Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm py-4">Your cart is empty</p>
      ) : (
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-start justify-between gap-2 pb-3 border-b border-border"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-card-foreground text-sm truncate">
                  {item.product.name}
                </p>
                <p className="text-price text-sm">
                  ₹{item.product.price.toLocaleString('en-IN')} × {item.quantity}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="w-6 h-6 flex items-center justify-center bg-muted rounded text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm text-card-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center bg-muted rounded text-card-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="w-6 h-6 flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground rounded transition-colors ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-card-foreground">Subtotal</span>
          <span className="font-bold text-card-foreground text-lg">
            ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <Button
          onClick={handleCheckout}
          disabled={items.length === 0}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Proceed to Checkout →
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;