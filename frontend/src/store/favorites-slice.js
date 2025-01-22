import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  successItems: [],
  isSuccessAddToCart: false,
  refetch: null,
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
    setRefetch: (state, action) => {
      state.refetch = action.payload;
    },
    resetState() {
      return initialFilterState;
    },
  },
});

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice.reducer;
