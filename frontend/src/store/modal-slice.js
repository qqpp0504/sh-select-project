import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  productModal: { isShowing: false, link: null },
  sizeModal: { isShowing: false, link: null },
  changeSizeModal: {
    isShowing: false,
    link: null,
    type: "",
    page: "",
  },
  shippingModal: { isShowing: false, link: null },
  favoriteAddedModal: { isShowing: false, link: null },
  successSendOrdersModal: { isShowing: false, link: null },
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showModal(state, action) {
      const { modalType, link } = action.payload;

      state[modalType].isShowing = true;
      state[modalType].link = link || null;

      if (modalType === "changeSizeModal") {
        const { type, page } = action.payload;

        state[modalType].type = type;
        state[modalType].page = page || null;
      }
    },
    closeModal(state, action) {
      const { modalType } = action.payload;

      state[modalType].isShowing = false;
    },
    resetModal() {
      return initialModalState;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
