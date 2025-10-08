import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import OrderCompletionPage from './pages/OrderCompletionPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/order-completion" element={<OrderCompletionPage />} />
      </Routes>
    </Router>
  );
};

export default App;