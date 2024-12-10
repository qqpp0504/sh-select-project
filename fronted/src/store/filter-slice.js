import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  category: "",
  gender: [],
  newProduct: [],
  onSale: [],
  brands: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    // 切換篩選條件，允許添加或移除特定篩選值
    toggleFilter(state, action) {
      const { filterType, value } = action.payload;

      if (filterType === "category") {
        if (state[filterType] === value) {
          return;
        }

        state[filterType] = value;
      } else {
        const valuesOfFilterType = state[filterType];
        state[filterType] = valuesOfFilterType.includes(value)
          ? valuesOfFilterType.filter((item) => item !== value)
          : [...valuesOfFilterType, value];
      }
    },
    // 清空所有篩選條件
    clearFilters() {
      return { ...initialFilterState };
    },

    updateCategoryFilter(state, action) {
      state.category = action.payload;
    },
    // 更新性別篩選條件
    updateGenderFilter(state, action) {
      state.gender = action.payload; // 覆蓋性別篩選條件
    },
    // 更新新品篩選條件
    updateNewProductFilter(state, action) {
      state.newProduct = action.payload; // 覆蓋新品篩選條件
    },
    // 更新特價篩選條件
    updateSaleFilter(state, action) {
      state.onSale = action.payload; // 覆蓋特價篩選條件
    },
    // 更新品牌篩選條件
    updateBrandFilter(state, action) {
      state.brands = action.payload; // 覆蓋品牌篩選條件
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
