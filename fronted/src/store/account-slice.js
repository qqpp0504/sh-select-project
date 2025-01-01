import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  email: "",
  userData: { token: "", user: {} },
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    updatedEmail(state, action) {
      state.email = action.payload;
    },
    login(state, action) {
      state.userData.token = action.payload.token;
      state.userData.user = action.payload.user;
    },
    logout(state) {
      state.userData.token = "";
      state.userData.user = {};
    },
    addFavorite(state, action) {
      const newFavorite = action.payload;

      if (!state.userData.user.favorites) {
        state.userData.user.favorites = [];
      }

      const existingFavorite = state.userData.user.favorites.find(
        (favorite) => favorite.id === newFavorite.id
      );

      if (!existingFavorite) {
        state.userData.user.favorites.push(newFavorite);
      } else {
        console.log("這個商品已經在最愛清單中");
      }
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
