import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaHeart, FaShoppingCart, FaMapMarkerAlt, FaPhoneAlt, FaInfoCircle, FaThLarge } from 'react-icons/fa';
import { useAppSelector } from '../store/hooks';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favoritesCount = useAppSelector((state) => state.favorites.items.length);
  const cartCount = useAppSelector((state) => state.cart.items.length);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none" style={{letterSpacing: '2px'}}>KelKel</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full px-4 py-2 rounded-lg border border-blue-500 transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-lg focus:ring-1 focus:ring-purple-500"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/catalog" className="flex flex-col items-center nav-link">
              <FaThLarge className="text-xl" />
              <span className="text-xs mt-1">Каталог</span>
            </Link>
            <Link to="/favorites" className="relative flex flex-col items-center nav-link">
              <FaHeart className="text-xl" />
              <span className="text-xs mt-1">Избранное</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative flex flex-col items-center nav-link">
              <FaShoppingCart className="text-xl" />
              <span className="text-xs mt-1">Корзина</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-[60]">
            <button
              className="p-2 w-12 h-12 flex flex-col items-center justify-center"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-800 block transition-all"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-800 block my-1.5"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-gray-800 block transition-all"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm md:hidden overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col pt-24 pb-8 px-6">
              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="w-full px-4 py-3 rounded-lg border border-blue-500 text-lg transition-all duration-300 focus:outline-none focus:border-purple-500 focus:shadow-lg focus:ring-1 focus:ring-purple-500"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6">
                <Link 
                  to="/catalog" 
                  className="flex items-center text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaThLarge className="mr-4" />
                  <span>Каталог</span>
                </Link>
                <Link 
                  to="/favorites" 
                  className="flex items-center text-2xl font-bold text-gray-800 hover:text-pink-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaHeart className="mr-4" />
                  <span>Избранное</span>
                  {favoritesCount > 0 && (
                    <span className="ml-3 bg-pink-500 text-white text-base rounded-full h-6 w-6 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/cart" 
                  className="flex items-center text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaShoppingCart className="mr-4" />
                  <span>Корзина</span>
                  {cartCount > 0 && (
                    <span className="ml-3 bg-green-500 text-white text-base rounded-full h-6 w-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Additional Menu Items */}
                <div className="h-px bg-gray-200 my-4" />
                
                <Link 
                  to="/addresses" 
                  className="flex items-center text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaMapMarkerAlt className="mr-4" />
                  <span>Наши адреса</span>
                </Link>
                
                <Link 
                  to="/contacts" 
                  className="flex items-center text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaPhoneAlt className="mr-4" />
                  <span>Контакты</span>
                </Link>
                
                <Link 
                  to="/about" 
                  className="flex items-center text-xl font-semibold text-gray-700 hover:text-blue-600 transition-colors p-2"
                  onClick={toggleMobileMenu}
                >
                  <FaInfoCircle className="mr-4" />
                  <span>О компании</span>
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 