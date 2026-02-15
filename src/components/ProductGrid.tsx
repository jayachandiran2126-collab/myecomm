import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex-1">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="flex items-center gap-3 bg-card rounded-lg px-4 py-2 shadow-md">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="font-bold text-card-foreground text-lg">MiniShop</span>
          <div className="flex-1 relative ml-4">
            <Input
              type="text"
              placeholder="Search for products, brands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 border-2 border-primary/30 focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-foreground text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;