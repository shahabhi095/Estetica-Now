import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSearchQuery, setCategory, selectFilteredProducts } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import { setAppointmentProducts } from '../redux/slices/appointmentSlice';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import { CATEGORIES } from '../utils/constants';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const selectedCategory = useAppSelector((state) => state.products.selectedCategory);
  const cart = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const [showCart, setShowCart] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);
  const [loadCount, setLoadCount] = useState(1);

  const PRODUCTS_PER_LOAD = 8;

  useEffect(() => {
    setDisplayedProducts(filteredProducts.slice(0, PRODUCTS_PER_LOAD * loadCount));
  }, [filteredProducts, loadCount]);

  useEffect(() => {
    setLoadCount(1);
  }, [searchQuery, selectedCategory]);

  const handleLoadMore = useCallback(() => {
    if (displayedProducts.length < filteredProducts.length) {
      setLoadCount((prev) => prev + 1);
    }
  }, [displayedProducts.length, filteredProducts.length]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    // Also update appointment if coming from order page
    dispatch(setAppointmentProducts(cart));
  };

  const handleCheckout = () => {
    setShowCart(false);
    navigate('/order-completion');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalItems={totalItems} onCartClick={() => setShowCart(true)} />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Products</h2>

        <div className="mb-6">
          <div className="relative mb-4">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for Product !"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={(category) => dispatch(setCategory(category))}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base md:text-lg">No products found</p>
          </div>
        )}

        {displayedProducts.length < filteredProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}
      </main>

      {showCart && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowCart(false)} />
          <CartSidebar onClose={() => setShowCart(false)} onCheckout={handleCheckout} />
        </>
      )}
    </div>
  );
};

export default ProductsPage;