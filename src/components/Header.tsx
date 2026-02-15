import React from 'react';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-secondary text-secondary-foreground py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-primary rounded-lg p-2">
            <span className="text-primary-foreground font-bold text-xl">AS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              AAHA SOLUTIONS
            </h1>
            <p className="text-xs text-secondary-foreground/70">
              Your One Stop Shop
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">

          {/* 🛒 Cart */}
          <Button
            variant="ghost"
            onClick={() => navigate('/cart')}
            className={`relative flex items-center gap-2 ${
              location.pathname === '/cart' ? 'bg-accent/20' : ''
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>

            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">

              {/* 📦 My Orders Button */}
              <Button
                variant="ghost"
                onClick={() => navigate('/my-orders')}
                className={`flex items-center gap-2 ${
                  location.pathname === '/my-orders'
                    ? 'bg-accent/20'
                    : ''
                }`}
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">My Orders</span>
              </Button>

              {/* 👤 Username */}
              <div className="hidden md:flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.name}</span>
              </div>

              {/* 🚪 Logout */}
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate('/login')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
            >
              <User className="h-4 w-4 mr-1" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
