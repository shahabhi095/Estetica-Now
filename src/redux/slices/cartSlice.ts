import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product } from '../../types';

const loadCartFromStorage = (): CartState => {
  try {
    const saved = localStorage.getItem('estetica-cart');
    if (saved) {
      const items = JSON.parse(saved);
      return {
        items,
        totalItems: items.reduce((sum: number, item: any) => sum + item.quantity, 0),
        totalPrice: items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
      };
    }
  } catch (error) {
    console.error('Failed to load cart:', error);
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.unshift({ ...action.payload, quantity: 1 }); // unshift adds to beginning
      }
      
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) item.quantity = quantity;
      }
      
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;