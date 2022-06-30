import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const productsFetch = createAsyncThunk(
  'products/productsFetch',
  async () => {
    const response = await fetch(
      'https://api.escuelajs.co/api/v1/products?offset=0&limit=20'
    );
    return response?.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    itemsStatus: null,
  },
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state, action) => {
      state.itemsStatus = 'pending';
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.itemsStatus = 'success';
      state.items = action.payload.map((obj) => {
        return { ...obj, stock: Math.round(Math.random() * (5 - 0) + 0) };
      });
    },
    [productsFetch.rejected]: (state, action) => {
      state.itemsStatus = 'rejected';
    },
  },
});

export default productsSlice.reducer;
