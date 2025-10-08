import { Middleware } from '@reduxjs/toolkit';

export const localStorageMiddleware: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);
  
  if (action.type && typeof action.type === 'string' && action.type.startsWith('cart/')) {
    const state = store.getState();
    try {
      localStorage.setItem('estetica-cart', JSON.stringify(state.cart.items));
      console.log('Cart saved to localStorage:', state.cart.items); // Debug log
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }
  
  return result;
};