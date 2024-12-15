import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isProductShowing: false,
  isSizeShowing: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showProductModal(state) {
      state.isProductShowing = true;
    },
    closeProductModal(state) {
      state.isProductShowing = false;
    },
    showSizeModal(state) {
      state.isSizeShowing = true;
    },
    closeSizeModal(state) {
      state.isSizeShowing = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
