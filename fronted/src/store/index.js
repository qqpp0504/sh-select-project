import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import filterReducer from "./filter-slice.js";
import modalReducer from "./modal-slice.js";
import cartReducer from "./cart-slice.js";
import accountReducer from "./account-slice.js";
import searchReducer from "./searchFaq-slice.js";

// 設定 persist 配置
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["filter", "modal", "account"], // 不持久化的 slice
};

// 使用 combineReducers 合併所有 reducers
const rootReducer = combineReducers({
  filter: filterReducer,
  modal: modalReducer,
  cart: cartReducer,
  account: accountReducer,
  searchFaq: searchReducer,
});

// 使用 persistReducer 包裝 rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 創建 store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略 redux-persist 的 action types
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// 創建 persistor
const persistor = persistStore(store);

export { store, persistor };
