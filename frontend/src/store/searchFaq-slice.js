import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
  searchTerm: "",
  searchResult: [],
};

const searchSlice = createSlice({
  name: "searchFaq",
  initialState: initialSearchState,
  reducers: {
    updatedSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    updatedSearchResult(state, action) {
      state.searchResult = action.payload;
    },
    clearSearchTerm(state) {
      state.searchTerm = "";
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
