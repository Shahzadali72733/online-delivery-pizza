import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload.pizzaId);
    },
increaseItem: (state, action) => {
  console.log("INCREASING ITEM", action.payload);
  const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
  if (item) {
    item.quantity++;
    item.totalPrice = item.quantity * item.unitPrice;
  }
},
  decreaseItem: (state, action) => {
  console.log("DECREASING ITEM", action.payload);
  const item = state.cart.find(item => item.pizzaId === action.payload.pizzaId);
  if (item) {
    item.quantity--;
    item.totalPrice = item.quantity * item.unitPrice;
    if (item.quantity === 0) {
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload.pizzaId);
    }
  }
},
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItem,
  decreaseItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalPizzaPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurrentQuantityById = (id) => (state) => {
  const item = state.cart.cart.find((item) => item.pizzaId === id);
  return item ? item.quantity : 0;
};
