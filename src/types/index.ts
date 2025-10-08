// Product Types
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

// State Types
export interface ProductsState {
  items: Product[];
  searchQuery: string;
  selectedCategory: string;
  loading: boolean;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

// Appointment Types
export interface AppointmentProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface AppointmentState {
  products: AppointmentProduct[];
  serviceTotal: number;
  taxRate: number;
  discount: number;
}