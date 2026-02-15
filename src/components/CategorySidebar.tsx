import React from 'react';
import { categories } from '@/data/products';
import { cn } from '@/lib/utils';

interface CategorySidebarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-lg animate-fade-in">
      <h2 className="text-lg font-bold text-card-foreground mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onSelectCategory(category)}
              className={cn(
                'w-full text-left px-4 py-2 rounded-md transition-all duration-200 font-medium',
                selectedCategory === category
                  ? 'bg-category-active text-category-active-foreground shadow-md'
                  : 'text-card-foreground hover:bg-muted'
              )}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;