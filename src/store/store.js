import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { productsFetch } from '../features/productsSlice';
import cartReducer, { getTotals } from '../features/cartSlice';
import usersReducer, { usersFetch } from '../features/usersSlice';
import currentUserReducer from '../features/currentUser';
import modalReducer from '../features/modalSlice';

export const Store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer,
    currentUser: currentUserReducer,
    modal: modalReducer,
  },
});

Store.dispatch(productsFetch());
Store.dispatch(usersFetch());
Store.dispatch(getTotals());
