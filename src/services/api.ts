import { Product } from '../store/slices/productsSlice';

// Mock data for products
const mockProducts: Product[] = Array.from({ length: 3500 }, (_, index) => ({
  id: index + 1,
  name: `Товар ${index + 1}`,
  price: Math.floor(Math.random() * 900000) + 10000,
  description: `Описание товара ${index + 1}. Это качественный товар с отличными характеристиками.`,
  image: `https://picsum.photos/seed/${index + 1}/400/400`,
  category: ['fridge', 'washer', 'tv', 'vacuum'][Math.floor(Math.random() * 4)],
  brand: ['Samsung', 'LG', 'Bosch', 'Philips', 'Sony'][Math.floor(Math.random() * 5)],
  inStock: Math.random() > 0.1,
}));

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  getProducts: async (): Promise<Product[]> => {
    await delay(1000); // Simulate network delay
    return mockProducts;
  },

  getProductById: async (id: number): Promise<Product | undefined> => {
    await delay(500);
    return mockProducts.find(product => product.id === id);
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    await delay(800);
    return mockProducts.filter(product => product.category === category);
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(600);
    const searchQuery = query.toLowerCase();
    return mockProducts.filter(
      product =>
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery)
    );
  },
}; 