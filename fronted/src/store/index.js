import { configureStore } from "@reduxjs/toolkit";

import filterReducer from "./filter-slice.js";
import modalReducer from "./modal-slice.js";
import cartReducer from "./cart-slice.js";

const store = configureStore({
  reducer: { filter: filterReducer, modal: modalReducer, cart: cartReducer },
});

export { store };
