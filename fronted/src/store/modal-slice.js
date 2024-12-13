import { createSlice } from "@reduxjs/toolkit";

const initialModalState = {
  isShowing: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialModalState,
  reducers: {
    showModal(state) {
      state.isShowing = true;
    },
    closeModal(state) {
      state.isShowing = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
