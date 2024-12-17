import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.originalPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.originalPrice;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.originalPrice;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
