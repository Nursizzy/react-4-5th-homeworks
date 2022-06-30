import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
        toast.success(
          `Another piece of ${action.payload.title} added to Cart!`,
          {
            position: 'bottom-right',
          }
        );
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.title} added to Cart!`, {
          position: 'bottom-right',
        });
      }
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      toast.warn(`${action.payload.title} removed from Cart! :(`, {
        position: 'bottom-right',
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      toast.warn(`All items removed from Cart! :(`, {
        position: 'bottom-right',
      });
    },

    RemoveOneItem(state, action) {
      const itemExists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (itemExists.quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        toast.warn(`${action.payload.title} removed from Cart! :(`, {
          position: 'bottom-right',
        });
      } else {
        itemExists.quantity -= 1;
        toast.success(
          `Another piece of ${action.payload.title} removed from Cart! :(`,
          {
            position: 'bottom-right',
          }
        );
      }
    },

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  RemoveOneItem,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
