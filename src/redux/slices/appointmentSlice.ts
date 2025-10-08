import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentState, CartItem } from '../../types';
import { calculateBilling } from '../../utils/calculations';

const initialState: AppointmentState = {
  products: [],
  serviceTotal: 1800,
  taxRate: 0.18,
  discount: 0,
};

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    setAppointmentProducts: (state, action: PayloadAction<CartItem[]>) => {
      state.products = action.payload.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity,
      }));
    },
    
    updateProductQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.quantity = action.payload.quantity;
        product.total = product.unitPrice * product.quantity;
      }
    },
    
    removeAppointmentProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    
    setDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
    
    clearAppointment: (state) => {
      state.products = [];
      state.discount = 0;
    },
  },
});

export const { 
  setAppointmentProducts, 
  updateProductQuantity, 
  removeAppointmentProduct,
  setDiscount,
  clearAppointment 
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

export const selectBilling = (state: { appointment: AppointmentState }) => {
  return calculateBilling(state.appointment);
};