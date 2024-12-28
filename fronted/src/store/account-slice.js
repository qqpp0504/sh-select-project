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
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
