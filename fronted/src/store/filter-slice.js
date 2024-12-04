import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = { gender: [], onSale: [], brands: [] };

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    toggleFilter(state, action) {
      const { filterType, value } = action.payload;
      const valuesOfFilterType = state[filterType];
      state[filterType] = valuesOfFilterType.includes(value)
        ? valuesOfFilterType.filter((item) => item !== value)
        : [...valuesOfFilterType, value];
    },
    clearFilters() {
      initialFilterState;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
