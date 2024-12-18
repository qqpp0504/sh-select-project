import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  activeItem: null,
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id && item.color.name === newItem.color.name
      );

      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.discountPrice,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.discountPrice;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.discountPrice;
    },
    removeFromCart(state, action) {
      const { id, color } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.color.name === color
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => !(item.id === id && item.color.name === color)
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.discountPrice;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.discountPrice;
    },
    checkItemStatus(state, action) {
      const currentItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === currentItem.id &&
          item.color.name === currentItem.color.name
      );

      state.activeItem = existingItem;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
