import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../types';
import { MOCK_PRODUCTS } from '../../utils/constants';

const initialState: ProductsState = {
  items: MOCK_PRODUCTS,
  searchQuery: '',
  selectedCategory: 'Massage Therapy',
  loading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSearchQuery, setCategory } = productsSlice.actions;
export default productsSlice.reducer;

// Selector
export const selectFilteredProducts = (state: { products: ProductsState }) => {
  const { items, searchQuery, selectedCategory } = state.products;
  return items.filter(
    (product) =>
      product.category === selectedCategory &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};