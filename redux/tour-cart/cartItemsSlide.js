import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
      cart: {},
    },
    reducers: {
        addToCart: (state, action) => {
          const { id, name, price } = action.payload;
          const itemIndex = state.findIndex(item => item.id === id);
          if (itemIndex !== -1) {
            state[itemIndex].quantity++;
          } else {
            state.push({ id, name, price, quantity: 1 });
          }
        },
        removeFromCart: (state, action) => {
          const itemIndex = state.findIndex(item => item.id === action.payload);
          if (itemIndex !== -1) {
            state.splice(itemIndex, 1);
          }
        },
        clearCart: state => {
          state = [];
        },
      },
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer