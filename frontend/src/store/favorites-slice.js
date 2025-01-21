import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  successItems: [],
  isSuccessAddToCart: false,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFilterState,
  reducers: {
    favoriteAddSuccess(state, action) {
      const newItem = action.payload;
      const existingItem = state.successItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.successItems.push(newItem);
      }
    },
    updatedIsSuccess(state, action) {
      state.isSuccessAddToCart = action.payload;
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
