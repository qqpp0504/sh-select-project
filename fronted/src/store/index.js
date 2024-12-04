import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filter-slice.js";

const store = configureStore({
  reducer: { filter: filterReducer },
});

export default store;
