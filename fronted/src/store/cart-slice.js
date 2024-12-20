import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  activeItem: null,
  totalQuantity: 0,
  totalAmount: 0,
  totalPrice: 0,
  shippingFee: 0,
  isShowingNotification: false,
  scrollPosition: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === newItem.id &&
          item.color.name === newItem.color.name &&
          item.size === newItem.size
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

      if (state.totalAmount < 4500 && state.totalAmount > 0) {
        state.shippingFee = 120;
        state.totalPrice = state.totalAmount + state.shippingFee;
      } else {
        state.shippingFee = 0;
        state.totalPrice = state.totalAmount;
      }
    },
    removeFromCart(state, action) {
      const { id, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id && item.color.name === color && item.size === size
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            !(item.id === id && item.color.name === color && item.size === size)
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.discountPrice;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.discountPrice;

      if (state.totalAmount < 4500 && state.totalAmount > 0) {
        state.shippingFee = 120;
        state.totalPrice = state.totalAmount + state.shippingFee;
      } else {
        state.shippingFee = 0;
        state.totalPrice = state.totalAmount;
      }
    },
    checkItemStatus(state, action) {
      const currentItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === currentItem.id &&
          item.color.name === currentItem.color.name &&
          item.size === currentItem.size
      );

      state.activeItem = existingItem;
    },
    updatedSize(state, action) {
      const { id, color, size } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && item.color.name === color
      );

      existingItem.size = size;
    },
    showNotification(state) {
      state.isShowingNotification = true;
    },
    closeNotification(state) {
      state.isShowingNotification = false;
    },
    updatedScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
