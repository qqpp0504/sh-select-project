import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  allFilters: {
    category: "",
    gender: [],
    newProduct: [],
    onSale: [],
    brands: [],
  },
  quantity: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState: initialFilterState,
  reducers: {
    // 切換篩選條件，允許添加或移除特定篩選值
    toggleFilter(state, action) {
      const { filterType, value } = action.payload;
      const valuesOfFilterType = state.allFilters[filterType];

      if (filterType === "category") {
        if (valuesOfFilterType === value) {
          return;
        }

        state.allFilters[filterType] = value;
      } else {
        state.allFilters[filterType] = valuesOfFilterType.includes(value)
          ? valuesOfFilterType.filter((item) => item !== value)
          : [...valuesOfFilterType, value];
      }
    },

    updateCategoryFilter(state, action) {
      state.allFilters.category = action.payload;
    },
    // 更新性別篩選條件
    updateGenderFilter(state, action) {
      state.allFilters.gender = action.payload; // 覆蓋性別篩選條件
    },
    // 更新新品篩選條件
    updateNewProductFilter(state, action) {
      state.allFilters.newProduct = action.payload; // 覆蓋新品篩選條件
    },
    // 更新特價篩選條件
    updateSaleFilter(state, action) {
      state.allFilters.onSale = action.payload; // 覆蓋特價篩選條件
    },
    // 更新品牌篩選條件
    updateBrandFilter(state, action) {
      state.allFilters.brands = action.payload; // 覆蓋品牌篩選條件
    },

    updateQuantity(state, action) {
      state.quantity = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
