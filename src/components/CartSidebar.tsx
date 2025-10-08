import React, { useState } from 'react';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingCart } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { setAppointmentProducts } from '../redux/slices/appointmentSlice';
import { formatCurrency } from '../utils/calculations';
import ConfirmModal from './ConfirmModal';

interface CartSidebarProps {
  onClose: () => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ onClose, onCheckout }) => {
  const dispatch = useAppDispatch();
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleRemoveClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch(removeFromCart(itemToDelete.id));
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckoutClick = () => {
    // Transfer cart items to appointment
    dispatch(setAppointmentProducts(items));
    onCheckout();
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Product Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 md:gap-4 bg-gray-50 rounded-lg p-3 md:p-4">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center text-2xl md:text-3xl border border-gray-200">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-xs md:text-sm mb-2 line-clamp-2">{item.name}</h3>
                  <p className="text-indigo-600 font-bold text-sm md:text-base">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => handleRemoveClick(item.id, item.name)}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    title="Remove item"
                  >
                    <FiTrash2 size={16} />
                  </button>
                  <div className="flex items-center gap-1 md:gap-2 bg-white rounded-lg border border-gray-300">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-6 md:w-8 text-center font-semibold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 rounded-r-lg transition-colors"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 md:p-6 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center text-base md:text-lg font-bold">
              <span>Total:</span>
              <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
            </div>
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Remove Item"
        message={`Are you sure you want to remove "${itemToDelete?.name}" from your cart?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default CartSidebar;