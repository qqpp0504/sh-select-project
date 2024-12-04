import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 使用 localStorage

import filterReducer from "./filter-slice.js";

// 設定 persist 配置
const persistConfig = {
  key: "root", // 為儲存的 key 定義一個名稱
  storage, // 使用 localStorage 作為儲存方式
};

const persistedReducer = persistReducer(persistConfig, filterReducer);

const store = configureStore({
  reducer: { filter: persistedReducer },
});

const persistor = persistStore(store); // 創建一個 persistor，用來管理持久化

export { store, persistor };
