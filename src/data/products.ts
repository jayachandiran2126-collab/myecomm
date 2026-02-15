import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vivo V30 Pro',
    description: 'Premium smartphone with 50MP camera and 5G connectivity',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Samsung Galaxy Buds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring features',
    price: 41900,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with RFID protection',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Sunglasses Pro',
    description: 'UV protected polarized sunglasses with metal frame',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'Backpack Elite',
    description: 'Water-resistant laptop backpack with USB charging port',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
  },
  {
    id: '8',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with 360° sound and 20hr battery',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    category: 'Electronics',
  },
];

export const categories = ['All', 'Electronics', 'Accessories'];