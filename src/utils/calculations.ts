import { AppointmentState } from '../types';

export const calculateBilling = (appointment: AppointmentState) => {
  const productTotal = appointment.products.reduce((sum, p) => sum + p.total, 0);
  const subtotal = appointment.serviceTotal + productTotal;
  const tax = subtotal * appointment.taxRate;
  const finalTotal = subtotal + tax - appointment.discount;
  
  return {
    serviceTotal: appointment.serviceTotal,
    productTotal,
    subtotal,
    tax,
    discount: appointment.discount,
    finalTotal,
  };
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};