import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  productModal: { isShowing: false, link: null },
  sizeModal: { isShowing: false, link: null },
  changeSizeModal: { isShowing: false, link: null },
  shippingModal: { isShowing: false, link: null },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showModal(state, action) {
      const { modalType, link } = action.payload;

      state[modalType].isShowing = true;
      state[modalType].link = link || null;
    },
    closeModal(state, action) {
      const { modalType } = action.payload;

      state[modalType].isShowing = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
