import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Product } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../store/slices/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const truncateDescription = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden p-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleFavorite}
          className={`absolute top-4 right-4 p-1.5 rounded-full shadow-sm
            ${isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 backdrop-blur-[2px] text-gray-600 hover:bg-white'
            } transition-colors duration-200`}
        >
          <FaHeart className="text-sm" />
        </motion.button>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-2 min-h-[2.5rem]">
          {truncateDescription(product.description)}
        </p>
        
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-semibold text-gray-900">
            {product.price.toLocaleString()} ₽
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-xs font-semibold shadow-md transform hover:scale-105 transition-all duration-300 min-w-[32px] sm:min-w-[80px]"
          >
            <FaShoppingCart className="text-xs mr-0.5 sm:mr-1.5" />
            <span className="hidden sm:inline">В корзину</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 