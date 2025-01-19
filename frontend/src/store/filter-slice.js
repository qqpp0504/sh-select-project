import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  quantity: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    updateQuantity(state, action) {
      state.quantity = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
