import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { RootState } from '../store';
import { removeFromFavorites } from '../store/slices/favoritesSlice';
import { addToCart } from '../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state: RootState) => state.favorites.items);
  const navigate = useNavigate();

  const handleRemoveFromFavorites = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Избранное пусто</h1>
          <p className="text-gray-600 mb-8">Добавьте товары в избранное, чтобы сохранить их на потом</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/catalog'}
          >
            Перейти в каталог
          </motion.button>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 w-fit mx-auto"
            onClick={() => navigate('/')}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Назад
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="mb-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 w-fit"
        onClick={() => navigate('/')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Назад
      </button>
      <h1 className="text-3xl font-bold mb-8">Избранное</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="product-card p-4"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <button
                onClick={() => handleRemoveFromFavorites(product.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-red-500 text-white"
              >
                <FaHeart />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">{product.price.toLocaleString()} ₽</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaShoppingCart className="inline-block mr-2" />
                В корзину
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites; 