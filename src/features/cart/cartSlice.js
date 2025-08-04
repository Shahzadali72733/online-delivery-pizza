import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item or increase if already exists
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(i => i.pizzaId === item.pizzaId);

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      } else {
        state.cart.push({
          ...item,
          quantity: 1,
          totalPrice: item.unitPrice,
        });
      }
    },

    // Remove item
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload.pizzaId);
    },

    // Increase quantity
    increaseItem: (state, action) => {
      console.log("INCREASING ITEM", action.payload);
      const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    // Decrease quantity and remove if zero
    decreaseItem: (state, action) => {
      console.log("DECREASING ITEM", action.payload);
      const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
        if (item.quantity === 0) {
          state.cart = state.cart.filter(i => i.pizzaId !== action.payload.pizzaId);
        }
      }
    },

    // Clear all cart items
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Export actions
export const {
  addItem,
  deleteItem,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

// Selectors
export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPizzaPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) => {
  const item = state.cart.cart.find((item) => item.pizzaId === id);
  return item ? item.quantity : 0;
};
