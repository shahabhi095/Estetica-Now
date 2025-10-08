import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { updateProductQuantity, removeAppointmentProduct, setAppointmentProducts, selectBilling } from '../redux/slices/appointmentSlice';
import { clearCart, removeFromCart as removeFromCartAction } from '../redux/slices/cartSlice';
import Header from '../components/Header';
import ConfirmModal from '../components/ConfirmModal';
import { formatCurrency } from '../utils/calculations';

const OrderCompletionPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const appointment = useAppSelector((state) => state.appointment);
  const billing = useAppSelector(selectBilling);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = useAppSelector((state) => state.cart.totalItems);

  const [showConfirm, setShowConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    if (cartItems.length > 0 && appointment.products.length === 0) {
      dispatch(setAppointmentProducts(cartItems));
    }
  }, [cartItems, appointment.products.length, dispatch]);

  const handleRemoveClick = (id: string, name: string) => {
    setItemToDelete({ id, name });
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // Remove from appointment
      dispatch(removeAppointmentProduct(itemToDelete.id));
      // Remove from cart (this will also update localStorage via middleware)
      dispatch(removeFromCartAction(itemToDelete.id));
      setShowConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setItemToDelete(null);
  };

  const handleAddExtraProducts = () => {
    navigate('/products');
  };

  const handleCompletePayment = () => {
    alert('Payment completed successfully! 🎉');
    dispatch(clearCart());
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalItems={totalItems} onCartClick={() => {}} showBackButton />

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Order Completion</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1">Booking Summary - APT-001</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FiShoppingCart size={16} className="text-indigo-600" />
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900">Products Used</h2>
              </div>

              {appointment.products.length === 0 ? (
                <div className="text-center py-12">
                  <FiShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">No products added yet</p>
                  <button
                    onClick={handleAddExtraProducts}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {appointment.products.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-3 md:p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 text-sm md:text-base">{product.name}</h3>
                          <div className="flex gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <FiEdit2 size={16} className="text-gray-600" />
                            </button>
                            <button 
                              onClick={() => handleRemoveClick(product.id, product.name)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <FiTrash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex gap-4 md:gap-8 text-xs md:text-sm">
                            <div>
                              <span className="text-gray-500 block mb-1">Quantity</span>
                              <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) =>
                                  dispatch(
                                    updateProductQuantity({
                                      id: product.id,
                                      quantity: parseInt(e.target.value) || 1,
                                    })
                                  )
                                }
                                className="w-14 md:w-16 px-2 py-1 border border-gray-300 rounded text-center"
                                min="1"
                              />
                            </div>
                            <div>
                              <span className="text-gray-500 block mb-1">Unit Price</span>
                              <p className="font-semibold">{formatCurrency(product.unitPrice)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500 block mb-1">Total</span>
                              <p className="font-semibold">{formatCurrency(product.total)}</p>
                            </div>
                          </div>
                          <button className="text-xs md:text-sm text-indigo-600 font-medium hover:text-indigo-700 whitespace-nowrap">
                            Special Discount
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={handleAddExtraProducts}
                    className="w-full mt-4 md:mt-6 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    <FiPlus size={20} />
                    Add Extra Products
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 lg:sticky lg:top-24">
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">Billing Summary</h2>

              <div className="space-y-3 mb-4 md:mb-6 text-sm md:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Service Total</span>
                  <span className="font-semibold">{formatCurrency(billing.serviceTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Product Total</span>
                  <span className="font-semibold">{formatCurrency(billing.productTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Order Discount (%)</span>
                  <span className="font-semibold">{billing.discount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (18%)</span>
                  <span className="font-semibold">{formatCurrency(billing.tax)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-gray-900">Final Total</span>
                  <span className="text-lg md:text-xl font-bold text-indigo-600">
                    {formatCurrency(billing.finalTotal)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={appointment.products.length === 0}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FiShoppingCart size={20} />
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Remove Product"
        message={`Are you sure you want to remove "${itemToDelete?.name}" from the order?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default OrderCompletionPage;