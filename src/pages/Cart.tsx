import React from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { RootState } from '../store';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, total } = useAppSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    const orderText = `Заказ с сайта KelKel:%0A${items.map(item => `${item.name} (${item.brand}) x${item.quantity} — ${(item.price * item.quantity).toLocaleString()}₽`).join('%0A')}%0AИтого: ${total.toLocaleString()}₽`;
    const phone = '996505590590';
    window.open(`https://wa.me/${phone}?text=${orderText}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => window.location.href = '/catalog'}
          >
            Перейти в каталог
          </motion.button>
          <button
            className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 w-fit"
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
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center p-4 border-b last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.brand}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FaMinus className="text-gray-600" />
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <FaPlus className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    {(item.price * item.quantity).toLocaleString()} ₽
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Итого</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Товары ({items.length})</span>
                <span>{total.toLocaleString()} ₽</span>
              </div>
              <div className="flex justify-between">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Итого к оплате</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleOrder}
              >
                Оформить заказ
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 