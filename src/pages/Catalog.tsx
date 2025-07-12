import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { fetchProducts } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Catalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state: RootState) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [search, setSearch] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'fridge', name: 'Холодильники' },
    { id: 'washer', name: 'Стиральные машины' },
    { id: 'tv', name: 'Телевизоры' },
    { id: 'vacuum', name: 'Пылесосы' },
  ];

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory === 'all') return true;
      return product.category === selectedCategory;
    })
    .filter(product => {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    })
    .filter(product => {
      if (!inStockOnly) return true;
      return product.inStock;
    })
    .filter(product => {
      const q = search.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="mb-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 w-fit"
        onClick={() => navigate('/')}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        Назад
      </button>
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

      {/* Поиск и фильтры */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Поиск по названию или категории..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            className="md:hidden ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setShowFilters(v => !v)}
          >
            Фильтры
          </button>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="form-checkbox"
            />
            В наличии
          </label>
        </div>
      </div>

      {/* Модальное окно фильтров для мобильных */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed inset-0 z-50 flex items-end md:hidden bg-black bg-opacity-40"
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full bg-white rounded-t-2xl p-6 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Фильтры</h2>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 text-2xl">×</button>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Категории</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => { setSelectedCategory(category.id); setShowFilters(false); }}
                      className={`block w-full text-left px-2 py-1 rounded ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-600'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Цена</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()} ₽</span>
                    <span>{priceRange[1].toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="form-checkbox"
                />
                В наличии
              </label>
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4"
                onClick={() => setShowFilters(false)}
              >
                Применить
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {/* Filters */}
        <div className={`md:col-span-1 ${showFilters ? '' : 'hidden md:block'}`}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Фильтры</h2>
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Категории</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Цена</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{priceRange[0].toLocaleString()} ₽</span>
                  <span>{priceRange[1].toLocaleString()} ₽</span>
                </div>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer mb-4">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="form-checkbox"
              />
              В наличии
            </label>
          </div>
        </div>
        {/* Products Grid */}
        <div className="md:col-span-3">
          {/* Sort Controls */}
          <div className="mb-6 flex justify-between items-center">
            <span className="text-gray-600">
              Найдено товаров: {filteredProducts.length}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="default">По умолчанию</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
              <option value="name-asc">Название: А-Я</option>
              <option value="name-desc">Название: Я-А</option>
            </select>
          </div>

          {/* Products */}
          {status === 'loading' ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog; 