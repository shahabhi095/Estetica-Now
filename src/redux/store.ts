import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import appointmentReducer from './slices/appointmentSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    appointment: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;