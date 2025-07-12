import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import { FaBlender, FaCoffee, FaTv, FaWifi, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdKitchen } from 'react-icons/md';
import { GiWashingMachine } from 'react-icons/gi';

const categories = [
  { id: 1, name: 'Холодильники', image: '/categories/fridge.jpg' },
  { id: 2, name: 'Стиральные машины', image: '/categories/washer.jpg' },
  { id: 3, name: 'Телевизоры', image: '/categories/tv.jpg' },
  { id: 4, name: 'Пылесосы', image: '/categories/vacuum.jpg' },
  { id: 5, name: 'Микроволновки', image: '/categories/microwave.jpg' },
  { id: 6, name: 'Плиты', image: '/categories/stove.jpg' },
  { id: 7, name: 'Утюги', image: '/categories/iron.jpg' },
  { id: 8, name: 'Кофемашины', image: '/categories/coffee.jpg' },
  // ...добавьте остальные категории
];

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCount = 5; 

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };
  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % categories.length);
  };

  // Получаем видимые категории с зацикливанием
  const getVisibleCategories = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(categories[(carouselIndex + i) % categories.length]);
    }
    return result;
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden h-[300px] sm:h-64 md:h-96 bg-[linear-gradient(to_right,_#a387e4,_#f05dc6)] mt-4"
      >
        {/* Content Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg text-center"
          >
            Добро пожаловать в KelKel
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-2xl text-white/90 drop-shadow text-center"
          >
            Лучшая бытовая техника по доступным ценам
          </motion.p>
        </div>
      </motion.div>
      <div className="container mx-auto px-4 py-8">
        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Категории</h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <button
              className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              onClick={handlePrev}
              aria-label="Назад"
            >
              <FaChevronLeft className="text-sm sm:text-base" />
            </button>
            <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar py-2">
              {getVisibleCategories().map((category) => (
                <div
                  key={category.id}
                  className="rounded-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center min-w-[110px] sm:min-w-[140px] md:min-w-[180px] max-w-[110px] sm:max-w-[140px] md:max-w-[180px] w-[110px] sm:w-[140px] md:w-[180px] h-[120px] sm:h-[180px] md:h-[220px] justify-center shadow-md hover:shadow-lg bg-white/80 backdrop-blur-sm"
                  style={{ boxShadow: '0 2px 8px rgba(160, 135, 228, 0.10)' }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 object-cover rounded-xl mb-1 sm:mb-2 md:mb-4"
                  />
                  <div className="text-center font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate w-full px-1">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              onClick={handleNext}
              aria-label="Вперёд"
            >
              <FaChevronRight className="text-sm sm:text-base" />
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Популярные товары</h2>
          {status === 'loading' ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
                {products.slice(0, 60).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center mt-8">
                <a href="/catalog" className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg text-base sm:text-lg font-semibold shadow hover:bg-blue-700 transition-colors">Подробнее</a>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
export default Home; 