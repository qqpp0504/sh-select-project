import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  activeItem: null,
  totalQuantity: 0,
  totalAmount: 0,
  totalPrice: 0,
  shippingFee: 0,
  showingNotification: { isOpen: false, type: "" },
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
          itemTotalPrice: newItem.discountPrice,
          idNumber: Date.now(),
        });
      } else {
        existingItem.quantity++;
        existingItem.itemTotalPrice += newItem.discountPrice;
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
      const { id, color, size, idNumber } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color.name === color &&
          item.size === size &&
          item.idNumber === idNumber
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.id === id &&
              item.color.name === color &&
              item.size === size &&
              item.idNumber === idNumber
            )
        );
      } else {
        existingItem.quantity--;
        existingItem.itemTotalPrice -= existingItem.discountPrice;
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
      state.activeItem = action.payload;
    },
    updatedSize(state, action) {
      const { id, color, size, idNumber } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          item.color.name === color &&
          item.idNumber === idNumber
      );

      existingItem.size = size;
    },
    showNotification(state, action) {
      state.showingNotification.isOpen = true;
      state.showingNotification.type = action.payload;
    },
    closeNotification(state) {
      state.showingNotification.isOpen = false;
    },
    updatedScrollPosition(state, action) {
      state.scrollPosition = action.payload;
    },
    resetShowingNotification(state) {
      state.showingNotification = { isOpen: false, type: "" };
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
