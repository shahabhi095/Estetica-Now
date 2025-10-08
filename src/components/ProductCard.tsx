import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Product } from '../types';

import { formatCurrency } from '../utils/calculations';

export const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
    <div className="aspect-square bg-gray-50 flex items-center justify-center text-5xl md:text-6xl relative">
      {product.image}
      <button
        onClick={onAddToCart}
        className="absolute bottom-3 right-3 w-9 h-9 md:w-10 md:h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-700"
      >
        <FiPlus size={18} />
      </button>
    </div>
    <div className="p-3 md:p-4">
      <h3 className="font-semibold text-gray-900 text-xs md:text-sm mb-1 line-clamp-2">{product.name}</h3>
      <p className="text-indigo-600 font-bold text-base md:text-lg">{formatCurrency(product.price)}</p>
    </div>
  </div>
);