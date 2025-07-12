import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { store } from './store';
import Aruna from './components/Aruna';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>
          <Aruna/>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
